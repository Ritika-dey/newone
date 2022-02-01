import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'

function ReviewFilter(props) {
  const location = useLocation();
  const [Data, setData] = useState(null);
  useEffect(() => {
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      const res = await fetch("/filterrating/" + props.filtername);
      const data = await res.json();

      // store the data into our Data variable
      setData(data);
    }
  });
  
  return (
    <>
      <div className="reviews__review__section col-sm-9">
        {/* <button className="btn btn-default" onClick={props.hideFilter}><i className="fa fa-arrow-circle-left"></i> Back</button> */}
        <h3 className="text-primary"><strong>{props.filtername} Reviews</strong></h3>
        {/* just repeated the code for better visual */}
        <div className="row">
          {Data && (
            <>

              {/* loop over the Data */}
              {Data.map((i, index) => (
                <div className="review col-sm-5" key={index}>
                  <div className="review__header">
                    <div className="review__header__img col-sm-3 col-xs-3">
                      <img className="img-circle img-responsive" src="data:image/png;base64,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" alt="profile image"></img>
                    </div>
                    <div className="reviewer__detail col-sm-9 col-xs-9">
                      <p><strong>{i.name}</strong></p>
                      <p>{i.university}</p>
                    </div>
                  </div>
                  <div className="review__content container-fluid">
                    <p className="text-justify"> {i.review}</p>
                  </div>
                </div>
              ))}

            </>
          )}

        </div>

      </div>

    </>
  )
}

export default ReviewFilter
