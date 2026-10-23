import { Hero, DisciplineStrip } from "@/components/hero";
import { Work } from "@/components/work";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Journal } from "@/components/journal";
import { Contact } from "@/components/contact";
import { GrowthServices } from "@/components/growth-services";

export default function Home() {
  return <main id="main"><Hero /><DisciplineStrip /><Work /><About /><Services /><GrowthServices /><Journal /><Contact /></main>;
}
