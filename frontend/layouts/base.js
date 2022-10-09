import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const BaseLayout = ({ children }) => {
	return (
		<>
			<Navbar />
			<Sidebar>{children}</Sidebar>
			{/* <Footer /> */}
		</>
	);
};

export default BaseLayout;
