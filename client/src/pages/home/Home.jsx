import { useEffect, lazy, Suspense } from "react";
import "./home.scss";
import Feature from "../../components/featureProduct/Feature";
const Slider = lazy(() => import("../../components/slider/Slider"));
import Service from "../../components/serviceSection/Service";
const Categories = lazy(() => import("../../components/categories/Categories"));
import { useDispatch, useSelector } from "react-redux";
import { featureData, fetchData } from "../../hooks/useFetch";
import { total } from "../../redux/cartSlice";
import Loader from "../../components/loader";

const Home = () => {
  const dispatch = useDispatch();
  const { feature, status, discount } = useSelector((state) => state.home);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(total());
  }, [cart]);

  useEffect(() => {
    dispatch(featureData("?page=1"));
    dispatch(fetchData("?page=1"));
  }, []);

  let deals = "deals of the day";
  let featureHeading = "Featured collection";

  return (
    <main className="main">
      <Suspense fallback={<Loader />}>
        <Slider />
        <Categories />
      </Suspense>
      <Feature listItem={discount} status={status} heading={deals} />
      <Service />
      <Feature listItem={feature} status={status} heading={featureHeading} />
    </main>
  );
};

export default Home;
