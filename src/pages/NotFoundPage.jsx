import PageTransition from '../components/common/PageTransition';

const NotFoundPage = () => {
  return (
    <PageTransition>
      <div className="d-flex justify-content-center pt-5">
        <h1>Sorry! We couldn't find that page.</h1>
      </div>
    </PageTransition>
  );
};

export default NotFoundPage;
