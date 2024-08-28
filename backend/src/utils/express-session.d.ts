
/* Ryan: I need some help modularizing this code. 
When I put these express-session type declarations in this file and alter the 
ts.config in typeRoots, I get lots of type errors from other libraries like express
 - even when including "typeRoots": ["./types", "node_modules/@types"]
*/


// // Extends express-session's SessionData interface to include custom properties
// declare module 'express-session' {
//   interface SessionData {
//     access_token: string;
//     refresh_token: string;
//     expires_at: number;
//   }
// }

// // Extends Express's Request interface to include the session with custom properties
// declare module 'express' {
//   interface Request {
//     session: session.Session & Partial<session.SessionData>;
//   }
// }
