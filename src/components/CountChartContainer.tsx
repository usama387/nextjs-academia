import Image from "next/image";
import CountChart from "./CountChart";
import prisma from "@/lib/prisma";

// parent of CountChart.tsx
const CountChartContainer = async () => {
  //   sex enum has 2 groups male and female and this query groups them and return the count
  const studentsCount = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  //now filter boys and girls from studentsCount
  const totalBoys =
    studentsCount.find((student) => student.sex === "MALE")?._count || 0;
  const totalGirls =
    studentsCount.find((student) => student.sex === "FEMALE")?._count || 0;

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <CountChart boys={totalBoys} girls={totalGirls} />
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-blue-600 rounded-full" />
          <h1 className="font-bold">{totalBoys}</h1>
          <h2 className="text-base font-bold  text-blue-500">
            Total Boys (
            {Math.round((totalBoys / (totalBoys + totalGirls)) * 100)}%)
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-red-600 rounded-full" />
          <h1 className="font-bold">{totalGirls}</h1>
          <h2 className="text-base font-bold text-red-500">
            {" "}
            Total Girls ({Math.round((totalGirls / (totalBoys + totalGirls)) * 100)}%){" "}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
