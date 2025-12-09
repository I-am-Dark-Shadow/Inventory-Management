// import { Monitor, Cpu, Keyboard, Mouse, Server, Plug } from 'lucide-react';

// const StatCard = ({ item, onAssign, onAdd }) => {
  
//   // Dynamic Icon Helper
//   const getIcon = (category) => {
//     switch (category) {
//       case 'Monitor': return <Monitor size={24} />;
//       case 'CPU': return <Cpu size={24} />;
//       case 'Keyboard': return <Keyboard size={24} />;
//       case 'Mouse': return <Mouse size={24} />;
//       case 'GreenVDI': return <Server size={24} />;
//       default: return <Plug size={24} />;
//     }
//   };

//   const isLowStock = item.quantity < 5;

//   return (
//     <div className={`bg-[#18181B] p-5 rounded-xl border transition-all hover:shadow-lg ${isLowStock ? 'border-red-500/50 shadow-red-900/10' : 'border-gray-800'}`}>
//       <div className="flex justify-between items-start mb-4">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-gray-800 rounded-lg text-gray-300">
//             {getIcon(item.category)}
//           </div>
//           <div>
//             <h3 className="font-semibold text-white">{item.name}</h3>
//             <p className="text-xs text-gray-500 uppercase tracking-wider">{item.category}</p>
//           </div>
//         </div>
//         <span className="text-2xl font-bold text-white">{item.quantity}</span>
//       </div>
      
//       <div className="flex justify-between text-sm text-gray-500 mb-4">
//         <span>Status</span>
//         <span className={`font-medium ${item.quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
//            {item.quantity > 0 ? 'Available' : 'Out of Stock'}
//         </span>
//       </div>

//       <div className="flex gap-2 mt-auto">
//         <button 
//           onClick={() => onAssign(item)}
//           className="flex-1 bg-transparent border border-gray-700 hover:bg-gray-800 text-white py-2 rounded text-xs font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
//           disabled={item.quantity === 0}
//         >
//           ASSIGN
//         </button>
//         <button 
//           onClick={() => onAdd(item)}
//           className="flex-1 bg-white text-black py-2 rounded text-xs font-bold hover:bg-gray-200 transition"
//         >
//           ADD NEW
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StatCard;