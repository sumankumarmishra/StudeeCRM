import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import UpdateAdmin from "../pages/UpdateAdmin/UpdateAdmin";
import Guides from "../pages/Guides/Guides";
import Guide1Table from "../pages/Guides/Guide1Table";
import NewGuide1 from "../pages/Guides/NewGuide1";
import Facilities from "../pages/Facilities/Facilities";
import NewFacility from "../pages/Facilities/NewFacility";
import UpdateFacility from "../pages/Facilities/UpdateFacility";
import Roles from "../pages/Roles/Roles";
import Members from "../pages/Members/Members";
import UpdateMembers from "../pages/Members/UpdateMembers";
import Applications from "../pages/Applications/Applications";
import NewProgram from "../pages/Programs/NewProgram";
import UpdateProgram from "../pages/Programs/UpdateProgram";
import Ratings from "../pages/Ratings/Ratings";
import Universities from "../pages/Universities/Universities";
import NewUniversity from "../pages/Universities/NewUniversity";
import UpdateUniversity from "../pages/Universities/UpdateUniversity";
import Country from "../pages/Country/Country";
import City from "../pages/Country/City";
import UpdateCountry from "../pages/Country/UpdateCountry";
import Students from "../pages/Students/Students";
import UpdateStudents from "../pages/Students/UpdateStudents";
import Subjects from "../pages/Subjects/Subjects";
import ProgramTypes from "../pages/ProgramTypes/ProgramTypes";
import NewSubject from "../pages/Subjects/NewSubject";
import UpdateSubject from "../pages/Subjects/UpdateSubject";
import Campus from "../pages/Universities/Campus/Campus";
import PageContent from "../pages/PageContent/PageContent";
import Heading from "../pages/PageContent/Heading";
import Degrees from "../pages/Subjects/Degrees/Degrees";
import NewDegree from "../pages/Subjects/Degrees/NewDegree";
import UpdateDegree from "../pages/Subjects/Degrees/UpdateDegree";
import Templetes from "../pages/Templates/Templetes";
import Mediums from "../pages/Mediums/Mediums";
import Campaigns from "../pages/Campaigns/Campaigns";
import NewMembers from "../pages/Members/NewMembers";
import Branches from "../pages/Branches/Branches";
import MyCases from "../pages/MyCases/MyCases";
import Form from "../pages/Form/Form";
import NewApplication from "../pages/Applications/NewApplication";
import CoreSettings from "../pages/CoreSettings/CoreSettings";
import DatatableData from "../pages/CoreSettings/DatatableData";
import UpdateApplication from "../pages/Applications/UpdateApplication";
import Fields from "../pages/Fields/Fields";
import NewRole from "../pages/Roles/NewRole";
import UpdateRole from "../pages/Roles/UpdateRole";
import AddForm from "../pages/Form/AddForm";
import UpdateForm from "../pages/Form/UpdateForm";
import Settings from "../pages/Settings/Settings";
import Schedule from "../pages/Schedule/Schedule";
import EmailOutlook from "../pages/EmailOutlook/EmailOutlook";
import Navbarpage from "../pages/Navbarpage/Navbarpage";
import UniEmails from "../pages/UniEmails/UniEmails";
import Filtered from "../pages/Programs/Filtered";
import Logs from "../pages/Logs/Logs";
import Notifications from "../pages/Notifications/Notifications";
import Notice from "../pages/Notice/Notice";
import UniversityGuide from "../pages/Resources/UniversityGuide";
import SubAgentHome from "../pages/home/SubAgentHome";
import axios from "axios";
import NewSubAgentApplication from "../pages/Applications/NewSubAgentApplication";
import UpdateSubAgentApplication from "../pages/Applications/UpdateSubAgentApplication";

function Adminroutes() {
  const user = localStorage.getItem("loggedIn");
  const role = localStorage.getItem("role");

  return (
    <div>
      <Routes>
        {user && role === "superadmin" ? (
          <>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="logs" element={<Logs />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="branches" element={<Branches />} />
            <Route path="facilities" element={<Facilities />} />
            {/* <Route path="email-outlook" element={<EmailOutlook />} /> */}
            <Route path="notice" element={<Notice />} />
            <Route path="university-guide" element={<UniversityGuide />} />
            <Route
              path="facilities/new"
              element={<NewFacility title="Add New Facility" />}
            />
            <Route
              path="facilities/update/:id"
              element={<UpdateFacility title="Update Facility" />}
            />
            <Route path="page-content" element={<PageContent />} />
            <Route path="navbar-details" element={<Navbarpage />} />
            <Route path="smtp-credentails" element={<UniEmails />} />
            <Route path="page-content/:urlName" element={<Heading />} />
            <Route path="members" element={<Members />} />
            <Route path="templates" element={<Templetes />} />
            <Route path="notification-types" element={<Mediums />} />
            <Route path="application-fields" element={<Fields />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="core-settings" element={<CoreSettings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route
              path="core-settings/data/:urlName"
              element={<DatatableData />}
            />
            <Route path="subjects" element={<Subjects />} />
            <Route path="form-design" element={<Form />} />
            <Route path="form-design/new" element={<AddForm />} />
            <Route path="form-design/update/:id" element={<UpdateForm />} />
            <Route
              path="subjects/new"
              element={<NewSubject title="Add Subject" />}
            />
            <Route
              path="subjects/update/:id"
              element={<UpdateSubject title="Update Subject" />}
            />
            <Route
              path="faculty/:urlName"
              element={<Degrees title="Update Subject" />}
            />
            <Route
              path="faculty/new/:id"
              element={<NewDegree title="Add Faculty" />}
            />
            <Route
              path="faculty/:subjectUrlName/update/:id"
              element={<UpdateDegree title="Update Faculty" />}
            />
            <Route path="campus/:urlName" element={<Campus />} />
            <Route
              path=":urlName/:campusUrlName/programs"
              element={<Filtered />}
            />
            <Route path="degree-types" element={<ProgramTypes />} />

            <Route
              path="members/new"
              element={<NewMembers title="Add Member" />}
            />

            <Route
              path="members/update/:id"
              element={<UpdateMembers title="Update Member" />}
            />

            <Route path="roles" element={<Roles />} />
            <Route path="roles/new" element={<NewRole title="New Role" />} />
            <Route
              path="roles/update/:id"
              element={<UpdateRole title="Update Role" />}
            />

            <Route
              path="/:urlName/:campusUrlName/programs/new"
              element={<NewProgram title="Add New Program" />}
            />
            <Route
              path="/:urlName/:campusUrlName/programs/update/:id"
              element={<UpdateProgram title="Update Program" />}
            />
            <Route path="universities" element={<Universities />} />
            <Route
              path="universities/new"
              element={<NewUniversity title="Add New University" />}
            />
            <Route
              path="universities/update/:id"
              element={<UpdateUniversity title="Update University" />}
            />
            <Route path="ratings" element={<Ratings />} />
            <Route path="applications" element={<Applications />} />
            <Route
              path="applications/new"
              element={<NewApplication title="Add new application" />}
            />
            <Route
              path="applications/update/:id/:studentId"
              element={<UpdateApplication title="Update application" />}
            />
            <Route path="my-cases" element={<MyCases />} />

            <Route path="guides" element={<Guides />} />
            <Route path="guides/:name" element={<Guide1Table />} />
            <Route
              path="guides/:name/new"
              element={<NewGuide1 title="Add guide data" />}
            />
            <Route path="countries" element={<Country />} />
            <Route path="countries/:name" element={<City />} />

            <Route
              path="countries/update/:id"
              element={<UpdateCountry title="Update Country" />}
            />
            <Route path="students" element={<Students />} />
            <Route path="students/update/:id" element={<UpdateStudents />} />
            <Route path="update" element={<UpdateAdmin />} />
          </>
        ) : user && role === "sub-agent" ? (
          <>
            <Route path="/" element={<Navigate to="/my-cases" />} />
            <Route
              path="applications/new"
              element={<NewSubAgentApplication title="Add new application" />}
            />
            <Route path="dashboard" element={<SubAgentHome />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="notice" element={<Notice />} />{" "}
            <Route path="university-guide" element={<UniversityGuide />} />
            <Route path="my-cases" element={<MyCases />} />
            <Route
              path="applications/update/:id/:studentId"
              element={<UpdateSubAgentApplication title="Update application" />}
            />
            <Route path="update" element={<UpdateAdmin />} />
          </>
        ) : user && role !== "sub-agent" && role !== "superadmin" ? (
          <>
            <Route path="/" element={<Navigate to="/my-cases" />} />
            <Route path="facilities" element={<Facilities />} />{" "}
            <Route path="dashboard" element={<SubAgentHome />} />
            {/* <Route path="email-outlook" element={<EmailOutlook />} /> */}
            <Route path="notice" element={<Notice />} />{" "}
            <Route path="university-guide" element={<UniversityGuide />} />
            <Route
              path="facilities/new"
              element={<NewFacility title="Add New Facility" />}
            />
            <Route
              path="facilities/update/:id"
              element={<UpdateFacility title="Update Facility" />}
            />
            <Route path="page-content" element={<PageContent />} />
            <Route path="page-content/:urlName" element={<Heading />} />
            <Route path="core-settings" element={<CoreSettings />} />
            <Route
              path="core-settings/data/:urlName"
              element={<DatatableData />}
            />
            <Route path="subjects" element={<Subjects />} />
            <Route
              path="subjects/new"
              element={<NewSubject title="Add Subject" />}
            />
            <Route
              path="subjects/update/:id"
              element={<UpdateSubject title="Update Subject" />}
            />
            <Route
              path="faculty/:urlName"
              element={<Degrees title="Update Subject" />}
            />
            <Route
              path="faculty/new/:id"
              element={<NewDegree title="Add Faculty" />}
            />
            <Route
              path="faculty/:subjectUrlName/update/:id"
              element={<UpdateDegree title="Update Faculty" />}
            />
            <Route path="campus/:urlName" element={<Campus />} />
            <Route
              path=":urlName/:campusUrlName/programs"
              element={<Filtered />}
            />
            <Route path="degree-types" element={<ProgramTypes />} />
            <Route
              path="/:urlName/:campusUrlName/programs/new"
              element={<NewProgram title="Add New Program" />}
            />
            <Route
              path="/:urlName/:campusUrlName/programs/update/:id"
              element={<UpdateProgram title="Update Program" />}
            />
            <Route path="universities" element={<Universities />} />
            <Route
              path="universities/new"
              element={<NewUniversity title="Add New University" />}
            />
            <Route
              path="universities/update/:id"
              element={<UpdateUniversity title="Update University" />}
            />
            <Route path="ratings" element={<Ratings />} />
            <Route
              path="applications/new"
              element={<NewApplication title="Add new application" />}
            />
            <Route path="/schedule" element={<Schedule />} />
            <Route
              path="applications/update/:id/:studentId"
              element={<UpdateApplication title="Update application" />}
            />
            <Route path="my-cases" element={<MyCases />} />
            <Route path="guides" element={<Guides />} />
            <Route path="guides/:name" element={<Guide1Table />} />
            <Route
              path="guides/:name/new"
              element={<NewGuide1 title="Add guide data" />}
            />
            <Route path="countries" element={<Country />} />
            <Route path="countries/:name" element={<City />} />
            <Route path="notifications" element={<Notifications />} />
            <Route
              path="countries/update/:id"
              element={<UpdateCountry title="Update Country" />}
            />
            <Route path="students" element={<Students />} />
            <Route path="students/update/:id" element={<UpdateStudents />} />
            <Route path="update" element={<UpdateAdmin />} />
          </>
        ) : (
          <Route path="/" element={<Home />} />
        )}
      </Routes>
    </div>
  );
}

export default Adminroutes;
