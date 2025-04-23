import Sidebar from '../Sidebar/page';

export default function Home() {
  return (
    <div className=" min-h-screen bg-gray-50 mt-[96px]">
      <Sidebar />

      <div className=" lg:ml-64  h-screen w-full">
        <div className="flex items-center justify-center flex-col  h-full">
          <h2 className="text-4xl font-semibold mb-4"> Chat Bot</h2>
          <p className="text-gray-400 text-sm mt-1 italic">(Coming soon... hopefully.)</p>
        </div>
      </div>
    </div>
  );
}
// import Sidebar from '../Sidebar/page';

// export default function Home() {
//   return (
//     <div className="flex min-h-screen bg-gray-50 mt-[96px]">
//       <Sidebar />

//       <div className="flex items-start p-8 justify-center h-screen w-full">
//         <div>
//           <h2 className="text-4xl font-semibold mb-4">Chat Bot</h2>
//           <p className="text-gray-500 text-lg mt-2">
//             Oh look, a chatbot... or at least the *idea* of one. It's not like we're in 2025 or
//             anything. Who needs conversational AI anyway, right?
//           </p>
//           <p className="text-gray-400 text-sm mt-1 italic">
//             (Coming soon... hopefully. Maybe. Someday.)
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
