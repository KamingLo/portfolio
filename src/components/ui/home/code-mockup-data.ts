export interface CodeToken {
  text: string;
  type: 'keyword' | 'string' | 'comment' | 'function' | 'className' | 'variable' | 'punctuation' | 'plain';
}

export interface CodeSnippet {
  id: 'nextjs' | 'laravel' | 'gin';
  label: string;
  fileName: string;
  lines: CodeToken[][];
}

export const codeSnippets: CodeSnippet[] = [
  {
    id: "nextjs",
    label: "Next.js",
    fileName: "app/page.tsx",
    lines: [
      // import { db } from "@/lib/db";
      [
        { text: "import", type: "keyword" },
        { text: " { ", type: "plain" },
        { text: "db", type: "variable" },
        { text: " } ", type: "plain" },
        { text: "from", type: "keyword" },
        { text: " ", type: "plain" },
        { text: "\"@/lib/db\"", type: "string" },
        { text: ";", type: "punctuation" }
      ],
      // [empty line]
      [],
      // export default async function Page() {
      [
        { text: "export", type: "keyword" },
        { text: " ", type: "plain" },
        { text: "default", type: "keyword" },
        { text: " ", type: "plain" },
        { text: "async", type: "keyword" },
        { text: " ", type: "plain" },
        { text: "function", type: "keyword" },
        { text: " ", type: "plain" },
        { text: "Page", type: "className" },
        { text: "() {", type: "punctuation" }
      ],
      //   const projects = await db.project.findMany({
      [
        { text: "  ", type: "plain" },
        { text: "const", type: "keyword" },
        { text: " projects = ", type: "plain" },
        { text: "await", type: "keyword" },
        { text: " db.", type: "plain" },
        { text: "project", type: "variable" },
        { text: ".", type: "punctuation" },
        { text: "findMany", type: "function" },
        { text: "({", type: "punctuation" }
      ],
      //     where: { featured: true },
      [
        { text: "    ", type: "plain" },
        { text: "where", type: "variable" },
        { text: ": { ", type: "plain" },
        { text: "featured", type: "variable" },
        { text: ": ", type: "plain" },
        { text: "true", type: "keyword" },
        { text: " },", type: "plain" }
      ],
      //     take: 3
      [
        { text: "    ", type: "plain" },
        { text: "take", type: "variable" },
        { text: ": ", type: "plain" },
        { text: "3", type: "string" }
      ],
      //   });
      [
        { text: "  ", type: "plain" },
        { text: "});", type: "punctuation" }
      ],
      // [empty line]
      [],
      //   return (
      [
        { text: "  ", type: "plain" },
        { text: "return", type: "keyword" },
        { text: " (", type: "punctuation" }
      ],
      //     <div className="grid gap-6">
      [
        { text: "    ", type: "plain" },
        { text: "<", type: "punctuation" },
        { text: "div", type: "keyword" },
        { text: " ", type: "plain" },
        { text: "className", type: "variable" },
        { text: "=", type: "punctuation" },
        { text: "\"grid gap-6\"", type: "string" },
        { text: ">", type: "punctuation" }
      ],
      //       {projects.map((p) => (
      [
        { text: "      ", type: "plain" },
        { text: "{", type: "punctuation" },
        { text: "projects.", type: "plain" },
        { text: "map", type: "function" },
        { text: "((", type: "punctuation" },
        { text: "p", type: "variable" },
        { text: ") => (", type: "punctuation" }
      ],
      //         <Card key={p.id} project={p} />
      [
        { text: "        ", type: "plain" },
        { text: "<", type: "punctuation" },
        { text: "Card", type: "className" },
        { text: " ", type: "plain" },
        { text: "key", type: "variable" },
        { text: "=", type: "punctuation" },
        { text: "{", type: "punctuation" },
        { text: "p.id", type: "plain" },
        { text: "}", type: "punctuation" },
        { text: " ", type: "plain" },
        { text: "project", type: "variable" },
        { text: "=", type: "punctuation" },
        { text: "{", type: "punctuation" },
        { text: "p", type: "variable" },
        { text: "}", type: "punctuation" },
        { text: " />", type: "punctuation" }
      ],
      //       ))}
      [
        { text: "      ", type: "plain" },
        { text: "))}", type: "punctuation" }
      ],
      //     </div>
      [
        { text: "    ", type: "plain" },
        { text: "</", type: "punctuation" },
        { text: "div", type: "keyword" },
        { text: ">", type: "punctuation" }
      ],
      //   );
      [
        { text: "  ", type: "plain" },
        { text: ");", type: "punctuation" }
      ],
      // }
      [
        { text: "}", type: "punctuation" }
      ]
    ]
  },
  {
    id: "laravel",
    label: "Laravel",
    fileName: "routes/web.php",
    lines: [
      // <?php [not strictly needed or we can start with use]
      // use App\Models\Project;
      [
        { text: "use", type: "keyword" },
        { text: " App\\Models\\Project", type: "plain" },
        { text: ";", type: "punctuation" }
      ],
      // use Illuminate\Support\Facades\Route;
      [
        { text: "use", type: "keyword" },
        { text: " Illuminate\\Support\\Facades\\Route", type: "plain" },
        { text: ";", type: "punctuation" }
      ],
      // [empty line]
      [],
      // Route::get('/projects', function () {
      [
        { text: "Route", type: "className" },
        { text: "::", type: "punctuation" },
        { text: "get", type: "function" },
        { text: "(", type: "punctuation" },
        { text: "'/projects'", type: "string" },
        { text: ", ", type: "plain" },
        { text: "function", type: "keyword" },
        { text: " () {", type: "punctuation" }
      ],
      //     $featured = Project::where('featured', true)
      [
        { text: "    ", type: "plain" },
        { text: "$featured", type: "variable" },
        { text: " = Project::", type: "plain" },
        { text: "where", type: "function" },
        { text: "(", type: "punctuation" },
        { text: "'featured'", type: "string" },
        { text: ", ", type: "plain" },
        { text: "true", type: "keyword" },
        { text: ")", type: "punctuation" }
      ],
      //         ->latest()
      [
        { text: "        ", type: "plain" },
        { text: "->", type: "punctuation" },
        { text: "latest", type: "function" },
        { text: "()", type: "punctuation" }
      ],
      //         ->take(3)
      [
        { text: "        ", type: "plain" },
        { text: "->", type: "punctuation" },
        { text: "take", type: "function" },
        { text: "(", type: "punctuation" },
        { text: "3", type: "string" },
        { text: ")", type: "punctuation" }
      ],
      //         ->get();
      [
        { text: "        ", type: "plain" },
        { text: "->", type: "punctuation" },
        { text: "get", type: "function" },
        { text: "();", type: "punctuation" }
      ],
      // [empty line]
      [],
      //     return view('projects.index', [
      [
        { text: "    ", type: "plain" },
        { text: "return", type: "keyword" },
        { text: " ", type: "plain" },
        { text: "view", type: "function" },
        { text: "(", type: "punctuation" },
        { text: "'projects.index'", type: "string" },
        { text: ", [", type: "punctuation" }
      ],
      //         'projects' => $featured
      [
        { text: "        ", type: "plain" },
        { text: "'projects'", type: "string" },
        { text: " => ", type: "plain" },
        { text: "$featured", type: "variable" }
      ],
      //     ]);
      [
        { text: "    ", type: "plain" },
        { text: "]);", type: "punctuation" }
      ],
      // });
      [
        { text: "});", type: "punctuation" }
      ]
    ]
  },
  {
    id: "gin",
    label: "Gin / Go",
    fileName: "main.go",
    lines: [
      // package main
      [
        { text: "package", type: "keyword" },
        { text: " main", type: "plain" }
      ],
      // [empty line]
      [],
      // import (
      [
        { text: "import", type: "keyword" },
        { text: " (", type: "punctuation" }
      ],
      // 	"net/http"
      [
        { text: "\t", type: "plain" },
        { text: "\"net/http\"", type: "string" }
      ],
      // 	"github.com/gin-gonic/gin"
      [
        { text: "\t", type: "plain" },
        { text: "\"github.com/gin-gonic/gin\"", type: "string" }
      ],
      // )
      [
        { text: ")", type: "punctuation" }
      ],
      // [empty line]
      [],
      // func main() {
      [
        { text: "func", type: "keyword" },
        { text: " ", type: "plain" },
        { text: "main", type: "function" },
        { text: "() {", type: "punctuation" }
      ],
      // 	r := gin.Default()
      [
        { text: "\tr := gin.", type: "plain" },
        { text: "Default", type: "function" },
        { text: "()", type: "punctuation" }
      ],
      // [empty line]
      [],
      // 	r.GET("/api/projects", func(c *gin.Context) {
      [
        { text: "\tr.", type: "plain" },
        { text: "GET", type: "function" },
        { text: "(", type: "punctuation" },
        { text: "\"/api/projects\"", type: "string" },
        { text: ", ", type: "plain" },
        { text: "func", type: "keyword" },
        { text: "(c *gin.", type: "plain" },
        { text: "Context", type: "className" },
        { text: ") {", type: "punctuation" }
      ],
      // 		projects := db.FindFeatured(3)
      [
        { text: "\t\tprojects := db.", type: "plain" },
        { text: "FindFeatured", type: "function" },
        { text: "(", type: "punctuation" },
        { text: "3", type: "string" },
        { text: ")", type: "punctuation" }
      ],
      // 		c.JSON(http.StatusOK, gin.H{
      [
        { text: "\t\tc.", type: "plain" },
        { text: "JSON", type: "function" },
        { text: "(", type: "punctuation" },
        { text: "http.", type: "plain" },
        { text: "StatusOK", type: "variable" },
        { text: ", gin.", type: "plain" },
        { text: "H", type: "className" },
        { text: "{", type: "punctuation" }
      ],
      // 			"status":   "success",
      [
        { text: "\t\t\t", type: "plain" },
        { text: "\"status\"", type: "string" },
        { text: ":   ", type: "plain" },
        { text: "\"success\"", type: "string" },
        { text: ",", type: "punctuation" }
      ],
      // 			"projects": projects,
      [
        { text: "\t\t\t", type: "plain" },
        { text: "\"projects\"", type: "string" },
        { text: ": ", type: "plain" },
        { text: "projects", type: "variable" },
        { text: ",", type: "punctuation" }
      ],
      // 		})
      [
        { text: "\t\t})", type: "punctuation" }
      ],
      // 	})
      [
        { text: "\t})", type: "punctuation" }
      ],
      // [empty line]
      [],
      // 	r.Run(":8080")
      [
        { text: "\tr.", type: "plain" },
        { text: "Run", type: "function" },
        { text: "(", type: "punctuation" },
        { text: "\":8080\"", type: "string" },
        { text: ")", type: "punctuation" }
      ],
      // }
      [
        { text: "}", type: "punctuation" }
      ]
    ]
  }
];
