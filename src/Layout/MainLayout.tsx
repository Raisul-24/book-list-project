import MainDisplay from '../Components/MianDisplay/MainDisplay';
import NavbarTop from '../Components/NavbarTop/NavbarTop';

const MainLayout = () => {
   return (
      <div className='max-w-5xl mx-auto bg-black text-white overflow-y-auto'>
         <NavbarTop></NavbarTop>
         <MainDisplay></MainDisplay>
         
      </div>
   );
};

export default MainLayout;