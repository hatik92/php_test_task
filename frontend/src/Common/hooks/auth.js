// import axios from 'axios'
// import { useNavigate, useParams } from 'react-router-dom';

// export const useAuth = (props) => {
//     // let navigate = useNavigate();
//     // console.log(navigate);
//     const csrf = () => axios.get('/sanctum/csrf-cookie')

//     const login = async ({ setErrors, setSuccessResponse }) => {
//         await csrf()
//         axios
//             .post('/login', props)
//             .then(() => {
//                   setSuccessResponse();
//                   // navigate('/login');
//               })
//             .catch(error => {
//                 setErrors(error);
//             })
//     }

//     return {
//         login
//     }
// }