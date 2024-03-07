// // pages/sets/[pageNumber].js

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// const SetsPage = () => {
//   const router = useRouter();
//   const { pageNumber } = router.query;
//   const [sets, setSets] = useState([]);

//   useEffect(() => {
//     // Fetch data for the sets based on the page number
//     // Example: Fetch data from your API or database
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/sets?page=${pageNumber}`);
//         const data = await response.json();
//         setSets(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [pageNumber]);

//   return (
//     <div>
//       <h1>Sets - Page {pageNumber}</h1>
//       <ul>
//         {sets.map((set) => (
//           <li key={set.id}>{set.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SetsPage;
