import React from "react";

const ViewCity = ({ data }) => {
  let cityImage = `https://crm.internationaleducationoffice.co.uk/cities/images/${data.image}`;

  return (
    <div style={{ margin: 40 }}>
      {/*Name*/}
      <h4>Name:</h4>
      <div>{data.name}</div>
      {/*Why study here*/}
      <h4>Why study in the {data.name}?</h4>
      <div dangerouslySetInnerHTML={{ __html: data.whyToStudy }}></div>
      {/*What to study*/}
      <h4>What to study in {data.name}?</h4>
      <div dangerouslySetInnerHTML={{ __html: data.whatToStudy }}></div>
      {/*How to study*/}
      <h4>How to study in {data.name}?</h4>
      <div dangerouslySetInnerHTML={{ __html: data.howToStudy }}></div>

      {/*Cost of study*/}
      <h4>Cost to study in {data.name}?</h4>
      <div dangerouslySetInnerHTML={{ __html: data.costOfStudy }}></div>
      {/*Banner Image*/}
      <h4>Banner Image of {data.name}?</h4>
      <img src={cityImage} width={400} height={200} alt={data.image} />
      {/*Key facts*/}
      <h4>Key facts</h4>
      <div>
        2. <span style={{ fontWeight: "bold" }}>Student Population: </span>
        {data.keyFacts.population}
      </div>

      <div>
        3. <span style={{ fontWeight: "bold" }}>Universities: </span>
        {data.keyFacts.temperature}
      </div>
    </div>
  );
};

export default ViewCity;
