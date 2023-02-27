import { useEffect, useState } from 'react'
import { getData, verifySignature } from '@govtechsg/open-attestation'
export default function BACIICertificate(props) {
  const data = getData(props.wrappedDocument);
  const imageRatio = 1440 / 2037;
  const [imageSize, setImageSize] = useState([0, 0])
  const url = `/api/template/render?wrappedDocument=${encodeURIComponent(JSON.stringify(props.wrappedDocument))}`
   useEffect(() => {
    console.log("Here is the raw dataa document", data);
    const observer = new ResizeObserver(() => {
      const width = clamp(document.body.clientWidth, 0, 720);
      setImageSize([width, width / (imageRatio)])
    })
    observer.observe(document.body);
    return () => observer.disconnect()
  }, [])

  return (<>
    <div className='renderer'>
      {/* fixed-canvas-wrapper  */}
      {/* <h1>Digital Asset Transfer</h1>
      <p> <span>Owner : </span> <span>{data.recipient?.name}</span></p>
      <p> <span>Address : </span> <span>{data.recipient?.address}</span></p>
      <hr></hr>
      <h3>Asset</h3>
      <p> <span>Type : </span> <span>{data.asset?.type}</span></p>
      <p> <span>Model : </span> <span>{data.asset?.model}</span></p>
      <p> <span>IssuDate : </span> <span>{data.asset?.issuDate}</span></p>
      <h3>Image</h3> */}
      <h3 style={{paddingBottom:"20px"}}>Asset image</h3>
      <img src={data?.asset?.image} width={250} height={250}></img>

{/*  */}
<table >
  <tr>
    <th>Owner</th>
    <th> Address</th>
    <th>Type</th>
    <th>Model</th>
    <th>IssuDate</th>
  </tr>
  <tr>
    <td> {data.recipient?.name} </td>
    <td>{data.recipient?.address}</td>
    <td>{data.asset?.type}</td>
    <td>{data.asset?.model}</td>
    <td>{data.asset?.issuDate}</td>
  </tr>

</table>
    </div>
  </>)


}


function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
};