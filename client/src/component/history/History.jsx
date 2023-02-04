
import { Link } from "react-router-dom";
function History({ pdf, number }) {
  const displayPdf = () => {
    if (!pdf) {
      return;
    }
    const newWindow = window.open();
    newWindow.document.write(`
          <iframe src="${pdf.pdf}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>
        `);
  };

  return (
    <div>
      <Link to="" onClick={displayPdf}>
        {number + 1}download his{" "}
      </Link>
    </div>
  );
}

export default History;
