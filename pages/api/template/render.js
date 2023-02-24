import { getData, verifySignature } from '@govtechsg/open-attestation'
import { createBacIICanvas, registerFonts } from '../../../lib/create-bacii-canvas'
import _ from 'lodash'
import BACIICertificate from '../../../components/BACIICertificate';

registerFonts();

/**
 * Renderer Handler
 * @param {import('next').NextApiRequest} request 
 * @param {import('next').NextApiResponse} response 
 */
export default async function (request, response) {
  const { qrcode, wrappedDocument: wrappedDocumentString } = request.query;
  const wrappedDocument = JSON.parse(wrappedDocumentString);

  if (!verifySignature(wrappedDocument)) {
    response.status(400).json({ msg: "invalid signature or document has been tampered with" });
    return;
  }

  const data = getData(wrappedDocument);

  // handle nullish field
  const get = (fieldPath, fallback = "") => {
    return _.get(data, fieldPath, fallback);
  }

  const signatureDate = get("certificate.signatureDate", "").split('\n');

  const certificateInfo = {
    id: get("certificate.id"),
    name: get("recipient.name"),
    gender: get("recipient.gender"),
    dateOfBirth: get("recipient.dateOfBirth"),
    placeOfBirth: get("recipient.placeOfBirth"),
    fatherName: get("recipient.fatherName"),
    motherName: get("recipient.motherName"),
    photoUrl: get("recipient.photoUrl"),
    program: get("certificate.program"),
    grade: get("certificate.grade"),
    rank: get("certificate.rank"),
    seat: get("certificate.center.seat"),
    room: get("certificate.center.room"),
    examDate: get("certificate.examDate"),
    centerName: get("certificate.center.id"),
    grades: get("certificate.subjectGrades", []),
    dates: signatureDate,
    barcode: get("certificate.barcode"),
    metadata: get("certificate.metadata"),
    originalPhotoPath: get('recipient.originalPhotoPath') || ""
  }

  const canvas = await createBacIICanvas(certificateInfo, qrcode);

  // create JPEG buffer
  const imageBuffer = canvas.toBuffer('image/png');
  response.setHeader("Content-disposition", "inline; filename=bacii-certificate.png")
  response.setHeader('Content-Type', 'image/png')
  response.send(imageBuffer);
}