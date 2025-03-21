import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import AdminLayout from './layout/AdminLayout';
import PerfilLayout from './layout/PerfilLayout';

import Login from './pages/Login';
import Registrar from './pages/Registrar';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import OlvidePassword from './pages/OlvidePassword';
import NuevoPassword from './pages/NuevoPassword';
import VistaGeneral from './pages/VistaGeneral';
import Configuracion from './pages/Configuracion';
import Perfil from './pages/Perfil';
import NuevoPaciente from './pages/NuevoPaciente';

import { AuthProvider } from './context/AuthProvider';
import { PacienteProvider } from './context/PacienteProvider';

import AdministrarPacientes from './pages/AdministrarPacientes';
import EditarPerfil from './pages/EditarPerfil';
import CambiarPassword from './pages/CambiarPassword';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacienteProvider>
          <Routes>

            <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path='registrar' element={<Registrar/>}/>
              <Route path='olvide-password' element={<OlvidePassword/>}/>
              <Route path='olvide-password/:token' element={<NuevoPassword/>}/>
              <Route path='confirmar/:token' element={<ConfirmarCuenta/>}/>
            </Route>

            <Route path='/admin' element={<AdminLayout/>}>
              <Route index element={<VistaGeneral/>}/>
              <Route path='administrar-pacientes' element={<AdministrarPacientes/>}/>
              <Route path='nuevo-paciente' element={<NuevoPaciente/>}/>
              <Route path='configuracion' element={<Configuracion/>}/>

              <Route path='perfil' element={<PerfilLayout/>}>
                <Route index element={<Perfil/>}/>
                <Route path='editar-perfil' element={<EditarPerfil/>}/>
                <Route path='cambiar-password' element={<CambiarPassword/>}/>
              </Route>
            </Route>
            
          </Routes>
        </PacienteProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
