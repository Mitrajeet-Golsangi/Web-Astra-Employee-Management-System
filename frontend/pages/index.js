import React from 'react';
import { useSelector } from 'react-redux';
import BaseLayout from '../layouts/base';
import { isEmpty } from '../utils/helpers';

import { useRouter } from 'next/router';

const Home = () => {
	return <div>Index</div>;
};

Home.getLayout = page => <BaseLayout>{page}</BaseLayout>;

export default Home;
