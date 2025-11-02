import { Container } from "@/shared";
import FormNewRestaurant from "../components/FormNewRestaurant";
import Header from "@/shared/components/Header";

export default function NewRestaurantPage() {
  return (
    <section>
      <Header sidebarOpen={false} setSidebarOpen={() => {}} />
      <Container>
        <FormNewRestaurant />
      </Container>
    </section>
  );
}
