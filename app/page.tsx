import Banner from "@/components/home/banner"
import FeaturedMenu from "@/components/home/featured-menu"
import { PizzaCategoriesSection } from "@/components/home/pizza-categories-section"
import Testimonials from "@/components/home/testimonials"
import WhyChooseUs from "@/components/home/why-choose-us"

export default function Page() {
  return (
    <>
      <Banner />
      <FeaturedMenu />
      <PizzaCategoriesSection />
      <WhyChooseUs />
      <Testimonials />
    </>
  )
}
