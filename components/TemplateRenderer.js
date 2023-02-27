import { FramedDocumentRenderer } from '@govtechsg/decentralized-renderer-react-components'
import BACIICertificate from './BACIICertificate.js'



export default function TemplateRenderer({ preview }) {

  if (preview) {
    // const wrappedDocument = {
    //   "data": {
    //     "$template": {
    //       "name": "bcf82926-9a94-4370-a8f8-7ed96ba5408e:string:MOEYS_BACII_CERTIFICATE",
    //       "type": "44d07ef3-16aa-4a84-b195-3534b6d14280:string:EMBEDDED_RENDERER",
    //       "url": "fdc56557-7618-40d0-9c41-22b3d838b029:string:https://renderer.verifykh.com"
    //     },
    //     "certificate": {
    //       "barcode": "c11ad6e2-e097-44c7-95df-f7f282089606:string:010401079031122000002",
    //       "center": {
    //         "id": "3ff16b1e-afbb-4ae1-ba1e-982523a156d0:string:វិ. សិរីសោភ័ណ ",
    //         "room": "eda1eb2f-6902-4781-a8ed-670d9eb53679:string:3",
    //         "seat": "2d1d731a-dac9-432a-8267-bd1e359f916e:string:62"
    //       },
    //       "examDate": "80f2d792-92b1-4acc-908d-05e4bbaf7e79:string:០៥ ធ្នូ ២០២២",
    //       "grade": "64a2f2f5-9d3c-41bf-9704-9a65f5b1bd22:string:D",
    //       "id": "150506c3-7563-4cd1-a9d1-959582934af1:string:លេខ ៤២ ៦៨១ / ២២ កប្រឡ",
    //       "metadata": "b26fc63e-23b1-43e5-8fea-1c11e11e848e:string:0910607039041129999362 (01/10/2023 05:49:13 PM)",
    //       "program": "513e43cc-9b57-4700-86a3-d948a7ec448e:string:វិទ្យាសាស្ត្រសង្គម",
    //       "rank": "4015e220-5f0a-477b-bd1f-8ba2a5de875b:string:66.700",
    //       "signatureDate": "6b89aaf2-774e-40f8-a6ad-14a07b45a720:string:ថ្ងៃចន្ទ ៤កើត ខែបុស្ស ឆ្នាំខាល ចត្វាស័ក ព.ស. ២៥៦៦\nរាជធានីភ្នំពេញ ថ្ងៃទី២៦ ខែ ធ្នូ ឆ្នាំ២០២២",
    //       "subjectGrades": [
    //         {
    //           "grade": "3166c8ec-b693-44b6-8f88-313825955ec3:string:F",
    //           "id": "ce215ea5-2387-4397-86ea-7e3e2364cf8e:string:ភាសាបរទេស"
    //         },
    //         {
    //           "grade": "25c48206-7229-4662-b648-f043208e5b7c:string:F",
    //           "id": "c95d6e61-db97-4333-8ed1-0813b238e92a:string:គណិតវិទ្យា"
    //         },
    //         {
    //           "grade": "08627c92-6360-42dc-a86a-447ddd531e04:string:D",
    //           "id": "b2204dab-b7ca-4be4-a2e9-df45cb5c6763:string:អក្សរសាស្រ្តខ្មែរ"
    //         },
    //         {
    //           "grade": "24a51d50-cd38-43fd-a5e2-825a841d246b:string:C",
    //           "id": "0702c219-9bb0-478c-9b19-9ecb27096613:string:ប្រវត្តិវិទ្យា"
    //         },
    //         {
    //           "grade": "43bc17c2-a73f-483d-af16-4f28df7acc09:string:C",
    //           "id": "7454a10d-73e3-4923-95d6-996a420ecf3f:string:ភូមិវិទ្យា"
    //         },
    //         {
    //           "grade": "63fdb214-5181-4d4f-9989-36ad9a35e130:string:C",
    //           "id": "6a41c2b9-fc86-4555-80a1-a45c961a17e5:string:សីលធម៍-ពលរដ្ឋវិទ្យា"
    //         },
    //         {
    //           "grade": "17fb2808-dd5d-40f1-8407-4e3407b6f5d0:string:F",
    //           "id": "2bec5731-1d98-4a53-b18a-76281d8eded7:string:ផែនដី និងបរិស្ថានវិទ្យា"
    //         }
    //       ],
    //       "type": "954ea9a4-cbc5-4943-a594-1c65a942d863:string:BACII",
    //       "year": "17ada7a4-bb9c-4234-9a5a-b338443f8bb4:string:២០២២"
    //     },
    //     "id": "ab9273f1-ff84-46c7-89b5-dd47bdf39fa7:string:13562",
    //     "issuers": [
    //       {
    //         "documentStore": "f42019ff-68c9-4f02-92f2-ddf6cfce1f7b:string:0x3a9EB1fF80d1D3BA337A3eAFF4418c9022957Fda",
    //         "identityProof": {
    //           "location": "42a59f7c-0147-4fbd-a138-b113a922b595:string:verifykh.com",
    //           "type": "dab073b2-a67a-4d93-8eb4-1ddc8b7eee25:string:DNS-TXT"
    //         },
    //         "name": "54af60ef-dad8-41aa-8d9e-93a7ece6033f:string:Digital Government Committee",
    //         "url": "0a606edc-2f63-4252-9735-90dae3502040:string:https://verifykh.com"
    //       }
    //     ],
    //     "recipient": {
    //       "dateOfBirth": "1726a79a-877f-42a2-942e-57c44f3edd65:string:២២ ឧសភា ២០០៤",
    //       "fatherName": "21e568ff-31dc-476f-8cc3-1b2697c069b3:string:រៀល ហុក",
    //       "gender": "1dd58de4-0ffd-4ed7-9c96-b9a3f6bf8430:string:ស្រី",
    //       "id": "7acedafa-8310-4247-aa7d-365a17537c8e:string:13562",
    //       "motherName": "0d89ba30-625e-41d8-a03a-53269907a365:string:ឈីវ ស្ដើង",
    //       "name": "9fbed072-8234-4f3d-b893-ede777853de9:string:ខិ គិមហ៊ុន",
    //       "originalPhotoPath": "719e8e8d-38d3-4a58-8a67-a95976981853:string:Photos\\12\\010401079031\\010401079031122000002.jpg",
    //       "photoUrl": "d7cb7707-722f-41fc-b77d-ceb0ef85514b:string:https://dgcuatstorage.blob.core.windows.net/dgs-bac2-photo/010401079031122000002.jpg",
    //       "placeOfBirth": "54bc213b-30c9-4aa4-a22f-752ae5119ed0:string:បន្ទាយមានជ័យ"
    //     }
    //   },
    //   "signature": {
    //     "merkleRoot": "fd119e93a63f512067bd66c92188d842545e03f261843a173e4c4b139179ea34",
    //     "proof": [],
    //     "targetHash": "fd119e93a63f512067bd66c92188d842545e03f261843a173e4c4b139179ea34",
    //     "type": "SHA3MerkleProof"
    //   },
    //   "version": "https://schema.openattestation.com/2.0/schema.json"
    // }
    
const wrappedDocument = {
  "version": "https://schema.openattestation.com/2.0/schema.json",
  "data": {
    "$template": {
      "name": "1c31a7db-cf45-4b03-9692-a300bcb7be42:string:KRISNA_TEMPLATE",
      "type": "c4d09f47-ed7e-47b3-a870-f1ba3d9a696b:string:EMBEDDED_RENDERER",
      "url": "8b32924c-93d3-4fb2-a2fb-fd7411c27cf1:string:http://localhost:3000/"
    },
    "recipient": {
      "name": "2c49a163-7448-4ccd-9a44-c78bdac4a947:string:Try Krisna Chain",
      "address": "e044efd3-08a6-40fe-ad51-e1e55ff4b1c7:string:st.1 Olympia Phnom Penh.DGC"
    },
    "asset": {
      "type": "b99d8648-92fd-4523-b2aa-8cc81190bb7b:string:Motor",
      "model": "12f5088f-54f5-46fa-a245-d660b60eaa7f:string:Honda Dream",
      "issuDate": "68630bfd-c171-4346-8e70-6fdb2c2413df:string:21-02-2022",
      "image": "caa8a0d7-93b6-4e12-9be8-6ef3fd9df6ee:string:https://cdn.britannica.com/16/126516-050-2D2DB8AC/Triumph-Rocket-III-motorcycle-2005.jpg"
    },
    "ownerAddr": {
      "value": "31308fef-20e4-4980-95be-b73e827b3958:string:Phnom Penh, Cambodia",
      "obfuscated": "e7eebe7a-c66f-482a-b4ca-478350cc96bc:boolean:true"
    },
    "issuers": [
      {
        "name": "055c8625-8203-412b-8a1f-f9b8ed9b1d23:string:Krisna Chain",
        "tokenRegistry": "52db5cf7-c9b9-4637-9c69-b7647261e644:string:0x8E82733684a4010C59455eCcF473258266cC6b1E",
        "identityProof": {
          "type": "d0674543-d2ae-4404-b3d3-702b052fa82e:string:DNS-TXT",
          "location": "682dc5cc-cd7a-411f-8ac7-f046c581eb3d:string:krisna.lol"
        }
      }
    ]
  },
  "signature": {
    "type": "SHA3MerkleProof",
    "targetHash": "31c454f1c868ce06ba793368d0a96bf1f7e72c2639e493e5bdf148f727b84be3",
    "proof": [],
    "merkleRoot": "31c454f1c868ce06ba793368d0a96bf1f7e72c2639e493e5bdf148f727b84be3"
  }
}

const doc= {
  "$template": {
    "name": "KRISNA_TEMPLATE",
    "type": "EMBEDDED_RENDERER",
    "url": "http://localhost:3000/"
  },
    "recipient": {
      "name": "Try Krisna Chain",
      "address": "st.1 Olympia Phnom Penh.DGC"
    },
    "asset": {
        "type": "Motor",
        "model": "Honda Dream",
        "issuDate": "21-02-2022",
        "image": "https://cdn.britannica.com/16/126516-050-2D2DB8AC/Triumph-Rocket-III-motorcycle-2005.jpg"
    },
    "ownerAddr": {
        "value": "Phnom Penh, Cambodia",
        "obfuscated": true
      },
    "issuers": [
      {
        "name": "Krisna Chain",
        "tokenRegistry": "0x8E82733684a4010C59455eCcF473258266cC6b1E",
        "identityProof": {
          "type": "DNS-TXT",
          "location": "krisna.lol"
        }
      }
    ]
}
    // const doc = {
    //   "$template": {
    //     "name": "MOEYS_BACII_CERTIFICATE",
    //     "type": "EMBEDDED_RENDERER",
    //     "url": "https://renderer.verifykh.com"
    //   },
    //   "certificate": {
    //     "barcode": "010401079031122000002",
    //     "center": {
    //       "id": "វិ. សិរីសោភ័ណ",
    //       "room": "3",
    //       "seat": "62"
    //     },
    //     "examDate": "០៥ ធ្នូ ២០២២",
    //     "grade": "D",
    //     "id": "លេខ ៤២ ៦៨១ / ២២ កប្រឡ",
    //     "metadata": "0910607039041129999362 (01/10/2023 05:49:13 PM)",
    //     "program": "វិទ្យាសាស្ត្រសង្គម",
    //     "rank": "66.700",
    //     "signatureDate": "ថ្ងៃចន្ទ ៤កើត ខែបុស្ស ឆ្នាំខាល ចត្វាស័ក ព.ស. ២៥៦៦\nរាជធានីភ្នំពេញ ថ្ងៃទី២៦ ខែ ធ្នូ ឆ្នាំ២០២២",
    //     "subjectGrades": [
    //       {
    //         "grade": "F",
    //         "id": "ភាសាបរទេស"
    //       },
    //       {
    //         "grade": "F",
    //         "id": "គណិតវិទ្យា"
    //       },
    //       {
    //         "grade": "D",
    //         "id": "អក្សរសាស្រ្តខ្មែរ"
    //       },
    //       {
    //         "grade": "C",
    //         "id": "ប្រវត្តិវិទ្យា"
    //       },
    //       {
    //         "grade": "C",
    //         "id": "ភូមិវិទ្យា"
    //       },
    //       {
    //         "grade": "C",
    //         "id": "សីលធម៍-ពលរដ្ឋវិទ្យា"
    //       },
    //       {
    //         "grade": "F",
    //         "id": "ផែនដី និងបរិស្ថានវិទ្យា"
    //       }
    //     ],
    //     "type": "BACII",
    //     "year": "២០២២"
    //   },
    //   "id": "13562",
    //   "issuers": [
    //     {
    //       "documentStore": "0x3a9EB1fF80d1D3BA337A3eAFF4418c9022957Fda",
    //       "identityProof": {
    //         "location": "verifykh.com",
    //         "type": "DNS-TXT"
    //       },
    //       "name": "Digital Government Committee",
    //       "url": "https://verifykh.com"
    //     }
    //   ],
    //   "recipient": {
    //     "dateOfBirth": "២២ ឧសភា ២០០៤",
    //     "fatherName": "រៀល ហុក",
    //     "gender": "ស្រី",
    //     "id": "13562",
    //     "motherName": "ឈីវ ស្ដើង",
    //     "name": "ខិ គិមហ៊ុន",
    //     "originalPhotoPath": "Photos\\12\\010401079031\\010401079031122000002.jpg",
    //     "photoUrl": "https://dgcuatstorage.blob.core.windows.net/dgs-bac2-photo/010401079031122000002.jpg",
    //     "placeOfBirth": "បន្ទាយមានជ័យ"
    //   }
    // }

    // preview only 
    return <BACIICertificate document={doc} wrappedDocument={wrappedDocument} />
  }

  const registry = {
    KRISNA_TEMPLATE: [
      {
        id: "certificate-1",
        label: "DIGITAL Renderer",
        template: BACIICertificate,
      },
    ],
  };

  return <FramedDocumentRenderer templateRegistry={registry} />
}


