// import { Trash2 } from 'lucide-react';

// const ProductTable = ({ products, onAssign, onDelete }) => {
//   return (
//     <div className="bg-[#18181B] rounded-lg border border-gray-800 overflow-hidden">
//       <table className="w-full text-left text-sm text-gray-400">
//         <thead className="bg-[#0F1115] text-gray-200 uppercase font-medium">
//           <tr>
//             <th className="px-6 py-4">Barcode</th>
//             <th className="px-6 py-4">Product Name</th>
//             <th className="px-6 py-4">Category</th>
//             <th className="px-6 py-4">Quantity</th>
//             <th className="px-6 py-4">Status</th>
//             <th className="px-6 py-4 text-right">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-800">
//           {products.length === 0 ? (
//             <tr>
//               <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No products found.</td>
//             </tr>
//           ) : (
//             products.map((p) => (
//               <tr key={p._id} className="hover:bg-gray-800/50 transition-colors">
//                 <td className="px-6 py-4 font-mono text-white">{p.barcode}</td>
//                 <td className="px-6 py-4 text-white font-medium">{p.name}</td>
//                 <td className="px-6 py-4">{p.category}</td>
//                 <td className={`px-6 py-4 font-bold ${p.quantity < 5 ? 'text-red-500' : 'text-white'}`}>
//                   {p.quantity}
//                 </td>
//                 <td className="px-6 py-4">
//                   <span className={`px-2 py-1 rounded text-xs border ${
//                     p.quantity > 0 
//                       ? 'border-green-500/30 bg-green-500/10 text-green-400' 
//                       : 'border-red-500/30 bg-red-500/10 text-red-400'
//                   }`}>
//                     {p.quantity > 0 ? 'Available' : 'Out of Stock'}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-right flex justify-end gap-2">
//                   <button 
//                     onClick={() => onAssign(p)}
//                     disabled={p.quantity <= 0}
//                     className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded hover:bg-blue-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
//                   >
//                     Assign
//                   </button>
//                   <button 
//                     onClick={() => onDelete(p._id)} 
//                     className="bg-red-500/10 text-red-400 px-3 py-1 rounded hover:bg-red-500/20"
//                   >
//                     <Trash2 size={14}/>
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductTable;