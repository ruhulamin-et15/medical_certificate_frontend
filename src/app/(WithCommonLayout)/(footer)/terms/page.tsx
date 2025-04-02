// import Part1 from "./Part1";
// import Part2 from "./Part2";
// import Part3 from "./Part3";
import Term from "@/components/page/terms/Terms";

export default function Terms() {
  return (
    <section className="container">
      <h1 className="text-[40px] font-bold text-center my-7">
        Terms and Conditions
      </h1>
      <p className="text-center text-lg">Terms of use for this website</p>
      <div className=" mx-auto">
        <Term />
        {/* <Part1></Part1>
        <Part2></Part2>
        <Part3></Part3> */}
      </div>
    </section>
  );
}
