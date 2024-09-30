// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { PlusCircle, Users } from "lucide-react";
// import styles from "../../styles/teams.module.css";
// import Sidebar from "@/components/Sidebar";
// import NavBar from "@/components/NavBar";

// const TeamForm = ({ onTeamCreated }) => {
//   const [name, setName] = useState("");
//   const [error, setError] = useState("");
//   const [showCreateModal, setShowCreateModal] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/teams", { name });
//       setName("");
//       setError("");
//       setShowCreateModal(false);
//       onTeamCreated(); // Refresh the list of teams
//     } catch (err) {
//       setError("Failed to create team");
//     }
//   };

//   return (
//     <>
//       <button
//         className={styles.createButton}
//         onClick={() => setShowCreateModal(true)}
//       >
//         <PlusCircle size={30} />
//         Create New Team
//       </button>
//       {showCreateModal && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modal}>
//             <h2>Create New Team</h2>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Team Name"
//                 required
//                 className={styles.input}
//               />
//               <div className={styles.modalButtons}>
//                 <button type="submit" className={styles.submitButton}>
//                   Create Team
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowCreateModal(false)}
//                   className={styles.cancelButton}
//                 >
//                   Cancel
//                 </button>
//               </div>
//               {error && <div className={styles.error}>{error}</div>}
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// const TeamList = () => {
//   const [teams, setTeams] = useState([]);
//   const [error, setError] = useState("");

//   const fetchTeams = async () => {
//     try {
//       const response = await axios.get("/api/teams");
//       setTeams(response.data);
//     } catch (err) {
//       setError("Failed to load teams");
//     }
//   };

//   useEffect(() => {
//     fetchTeams();
//   }, []);

//   return (
//     <main className="container">
//       <NavBar />
//       <div className="flex-row">
//         <Sidebar />
//         <div className={styles.container}>
//           <h1 className={styles.title}>Your Teams</h1>
//           <TeamForm onTeamCreated={fetchTeams} />
//           {error && <div className={styles.error}>{error}</div>}
//           <div className={styles.teamGrid}>
//             {teams.map((team) => (
//               <div key={team.id} className={styles.teamCard}>
//                 <h2>{team.name}</h2>
//                 <p>
//                   <Users size={16} />
//                   {team.members || 1} member
//                   {(team.members || 1) !== 1 ? "s" : ""}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default TeamList;

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle, Users } from "lucide-react";
import styles from "../../styles/teams.module.css";
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TeamForm = ({ onTeamCreated }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/teams", { name });
      setName("");
      setError("");
      setShowCreateModal(false);
      onTeamCreated(); // Refresh the list of teams
    } catch (err) {
      setError("Failed to create team");
    }
  };

  return (
    <>
      <button
        className={styles.createButton}
        onClick={() => setShowCreateModal(true)}
      >
        <PlusCircle size={30} />
        Create New Team
      </button>
      {showCreateModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Create New Team</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Team Name"
                required
                className={styles.input}
              />
              <div className={styles.modalButtons}>
                <button type="submit" className={styles.submitButton}>
                  Create Team
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
              {error && <div className={styles.error}>{error}</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchTeams = async () => {
    try {
      const response = await axios.get("/api/teams");
      setTeams(response.data);
    } catch (err) {
      setError("Failed to load teams");
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleTeamClick = (teamId) => {
    router.push(`/teams/${teamId}`);
  };

  return (
    <main className="container">
      <NavBar />
      <div className="flex-row">
        <Sidebar />
        <div className={styles.container}>
          <h1 className={styles.title}>Your Teams</h1>
          <TeamForm onTeamCreated={fetchTeams} />
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.teamGrid}>
            {teams.map((team) => (
              <Link href={`/teams/${team.id}`} key={team.id}>
                <div
                  className={styles.teamCard}
                  onClick={() => handleTeamClick(team.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleTeamClick(team.id);
                    }
                  }}
                >
                  <h2>{team.name}</h2>
                  <p>
                    <Users size={16} />
                    {team.members || 1} member
                    {(team.members || 1) !== 1 ? "s" : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default TeamList;
