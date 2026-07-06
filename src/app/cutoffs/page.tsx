import { parseCutoffs, parseInstitutes } from "@/lib/csv-parser";

export const metadata = {
  title: "Historical Cutoffs | GAT-B Guide",
  description: "View the historical cutoff data for GAT-B admissions across various categories.",
};

export default async function CutoffsPage() {
  const cutoffs = await parseCutoffs();
  const institutes = await parseInstitutes();

  // Create a mapping of institute ID to Name for fast lookup
  const instituteMap = new Map(institutes.map(inst => [inst.institute_id, inst.institute_name]));

  return (
    <main className="min-h-screen bg-science-pattern py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Historical Cutoffs
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            A complete log of previous years' cutoff scores for all reservation categories.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="overflow-x-auto max-h-[800px] overflow-y-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="sticky top-0 bg-slate-50 dark:bg-slate-950 text-xs uppercase text-slate-700 dark:text-slate-300 shadow-sm z-10">
                <tr>
                  <th className="px-6 py-4 font-semibold">Institute Name</th>
                  <th className="px-6 py-4 font-semibold">Year</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Min Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {cutoffs.map((cutoff, index) => (
                  <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white max-w-sm truncate" title={instituteMap.get(cutoff.institute_id) || cutoff.institute_id}>
                      {instituteMap.get(cutoff.institute_id) || cutoff.institute_id}
                    </td>
                    <td className="px-6 py-4">{cutoff.year}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-800 dark:text-slate-200">
                        {cutoff.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">{cutoff.min_score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
