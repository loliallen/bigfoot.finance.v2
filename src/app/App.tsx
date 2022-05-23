// import { BrowserRouter as Router, Routes } from "react-router-dom";
// import { Navigate, Route } from "react-router";
// import { HomePage, MarketplacePage } from "../pages";
// import { EthProvider } from "../hook/useEth/useEth";
// import { CatchRefAddress } from "../components/CatchRefAddress";
// import { CONTRACTS } from "./helpers";
// import { AppProvider } from "../hook/useEth/useApp/useApp";
// import { DappOutlet } from "../pages/dapp/dapp.outlet";
// import { AlertProvider } from "../hook/useAlert";
// import { Nodes } from "../components/Nodes/Nodes";
// import { Dashboard } from "../components/Dashboard/Dashboard";
// import { PurchaseNode } from "../components/PurchaseNode/PurchaseNode";
// import { RewardsHistory } from "../components/Rewards";
// import { Staking } from "../components/Staking";
// import "aos/dist/aos.css";
// import "../styles/theme.less";
// import "../styles/global.scss";

// export const App = () => {
//   return (
//     <AlertProvider>
//       <EthProvider contracts={CONTRACTS}>
//         <AppProvider>
//           <Router>
//             <Routes>
//               <Route path="/" element={<CatchRefAddress />}>
//                 <Route path="/" element={<HomePage />} />
//                 <Route path="/dapp" element={<DappOutlet />}>
//                   <Route path="" element={<Navigate to="dashboard" />} />
//                   <Route path="dashboard" element={<Dashboard />} />
//                   <Route path="purchase" element={<PurchaseNode />} />
//                   <Route path="nodes" element={<Nodes />} />
//                   <Route path="rewards" element={<RewardsHistory />} />
//                   <Route path="staking" element={<Staking />} />
//                 </Route>
//                 <Route path="/marketplace" element={<MarketplacePage />} />
//               </Route>
//             </Routes>
//           </Router>
//         </AppProvider>
//       </EthProvider>
//     </AlertProvider>
//   );
// };
export {};
