import { parseInstitutes } from "@/lib/csv-parser";

export const metadata = {
  title: "Participating Institutes | GAT-B Guide",
  description: "View the complete list of participating institutes and programmes for GAT-B 2026 admissions.",
};

export default async function InstitutesPage() {
  const institutes = await parseInstitutes();

  return (
    <main className="min-h-screen bg-science-pattern py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Participating Institutes
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            A comprehensive list of all institutes accepting GAT-B scores for biotechnology admissions.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-950/50 text-xs uppercase text-slate-700 dark:text-slate-300">
                <tr>
                  <th className="px-6 py-4 font-semibold">Institute</th>
                  <th className="px-6 py-4 font-semibold">Programme</th>
                  <th className="px-6 py-4 font-semibold">Degree</th>
                  <th className="px-6 py-4 font-semibold">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {institutes.map((inst, index) => (
                  <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {inst.institute_name}
                    </td>
                    <td className="px-6 py-4">{inst.programme_offered}</td>
                    <td className="px-6 py-4">{inst.degree_type}</td>
                    <td className="px-6 py-4">{inst.state}</td>
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
