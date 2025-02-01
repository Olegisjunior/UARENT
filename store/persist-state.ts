// export const saveState = (state: any) => {
//   try {
//     if (typeof localStorage === "undefined") return;
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("orderState", serializedState);
//   } catch (err) {
//     console.error("Error saving state:", err);
//   }
// };

// export const loadState = () => {
//   try {
//     if (typeof localStorage === "undefined") return undefined;
//     const serializedState = localStorage.getItem("orderState");
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (err) {
//     console.error("Error loading state:", err);
//     return undefined;
//   }
// };
