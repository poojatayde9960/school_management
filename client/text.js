import React, { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return <>

        <div className="bg-blue-600 text-white ">
            <div className="  px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <span className="font-bold text-xl">🏫 MySchool</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <a className="hover:text-gray-200">Home</a>
                        <a className="hover:text-gray-200">About</a>
                        <a className="hover:text-gray-200">Courses</a>
                        <a className="hover:text-gray-200">Contact</a>
                    </div>
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-blue-500 px-4 pt-2 pb-4 space-y-2">
                    <a href="#home" className="block hover:text-gray-200">Home</a>
                    <a href="#about" className="block hover:text-gray-200">About</a>
                    <a href="#courses" className="block hover:text-gray-200">Courses</a>
                    <a href="#contact" className="block hover:text-gray-200">Contact</a>
                </div>
            )}
        </div>
    </>
}

// -----------------------------------------
// import React, { useState } from 'react';

// const LightSwitch = () => {
//   // useState वापरून light ची स्थिती ठेवतो (सुरुवातीला बंद - false)
//   const [isLightOn, setIsLightOn] = useState(false);

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h1>💡 Light is {isLightOn ? 'ON' : 'OFF'}</h1>
      
//       {/* बटणावर क्लिक केल्यावर लाईट सुरू किंवा बंद */}
//       <button 
//         onClick={() => setIsLightOn(!isLightOn)} 
//         style={{
//           padding: '10px 20px',
//           fontSize: '16px',
//           cursor: 'pointer',
//           backgroundColor: isLightOn ? 'green' : 'gray',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px'
//         }}
//       >
//         {isLightOn ? 'Turn OFF' : 'Turn ON'}
//       </button>
//     </div>
//   );
// };

// export default LightSwitch;
