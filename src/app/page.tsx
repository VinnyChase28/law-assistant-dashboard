import { redirect } from "next/navigation";
import { MainNavigation } from "./_components/main-navigation";
import AlertComponent from "./_components/alert";

const Home = async () => {
  redirect("/dashboard");

  return (
    <div>
      <MainNavigation />
      <AlertComponent
        title="Welcome!"
        description="We home you enjoy your stay"
        iconType="info"
      />
    </div>
  );
};

export default Home;
