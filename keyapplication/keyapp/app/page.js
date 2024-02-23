import dynamic from 'next/dynamic';

const MyClientSideComponent = dynamic(() => import('../components/KeyComponent'), { ssr: false });

const MyPage = () => {
  return (
    <div>
      <MyClientSideComponent />
    </div>
  );
};

export default MyPage;