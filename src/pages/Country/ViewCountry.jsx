import React, { useEffect } from "react";

const ViewCountry = ({ data }) => {
  let countryImage = `https://crm.internationaleducationoffice.co.uk/countries/images/${data.countryImage}`;
  let personImage = `https://crm.internationaleducationoffice.co.uk/countries/images/${data.whatTheExpertSays.personImage}`;

  return (
    <div style={{ margin: 40 }}>
      {/*Name*/}
      <h4>Name:</h4>
      <div>{data.name}</div>
      {/*Why study here*/}
      <h4>Why study in the {data.name}?</h4>
      <div dangerouslySetInnerHTML={{ __html: data.whyStudyHere }}></div>
      {/*What are the best programs*/}
      <h4>What are the best programs in the {data.name}?</h4>
      <div dangerouslySetInnerHTML={{ __html: data.bestPrograms }}></div>

      {/*What is the cost of studying*/}
      <h4>What is the cost of studying in the {data.name}?</h4>
      <div dangerouslySetInnerHTML={{ __html: data.costOfStudy }}></div>
      {/*Banner Image*/}
      <h4>Banner Image of {data.name}?</h4>
      <img
        src={countryImage}
        width={400}
        height={200}
        alt={data.countryImage}
      />
      {/*Key facts*/}
      <h4>Key facts</h4>
      <div>
        1. <span style={{ fontWeight: "bold" }}>Currency: </span>
        {data.keyFacts.currency}
      </div>
      <div>
        2. <span style={{ fontWeight: "bold" }}>Student Population: </span>
        {data.keyFacts.studentPopulation}
      </div>
      <div style={{ display: "flex" }}>
        3. <span style={{ fontWeight: "bold" }}>Languages: </span>
        {data.keyFacts.languages.map((row) => row).join(" ")}
      </div>
      <div>
        4. <span style={{ fontWeight: "bold" }}>Universities: </span>
        {data.keyFacts.universities}
      </div>
      {/*
    
    Where can you study*/}
      <h4>Where can you study in the {data.name}?</h4>
      <div dangerouslySetInnerHTML={{ __html: data.whereCanYouStudy }}></div>

      {/*
    Where can you study*/}
      <h4>{data.name} student visa</h4>
      <div dangerouslySetInnerHTML={{ __html: data.studentVisa }}></div>
      {/*Reuirements*/}
      <h4>What are the requirements to study in the {data.name}?</h4>
      <h5>Qualifications</h5>
      <div dangerouslySetInnerHTML={{ __html: data.qualifications }}></div>
      <h5>English language tests</h5>
      <div dangerouslySetInnerHTML={{ __html: data.englishLanguageTest }}></div>
      {/*Where can you study*/}
      <h4>What the experts say about {data.name}</h4>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <div>
            <img
              src={personImage}
              alt={data.whatTheExpertSays.personImage}
              style={{ borderRadius: 100, width: 80, height: 80 }}
            />
          </div>
          <div>{data.whatTheExpertSays.personName}</div>
        </div>
        <div
          style={{ textAlign: "center", marginLeft: 20 }}
          dangerouslySetInnerHTML={{
            __html: data.whatTheExpertSays.message,
          }}></div>
      </div>
    </div>
  );
};

export default ViewCountry;
