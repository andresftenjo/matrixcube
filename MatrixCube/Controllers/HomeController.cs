using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Threading.Tasks;
using System.Web;
using System.IO;
using System.Web.Script.Serialization;

namespace MatrixCube.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        public ActionResult ReadMatrix(string dimensions, string actions)
        {
            var response = getCube(dimensions, actions);

            return Content(string.Join(", ", response), "application/json");
        }
        public List<string> getCube(string dimensions, string actions ) {

            List<string> retValue = new List<string>();

            string[] s = dimensions.Split(' ');
            int n, m; n = int.Parse(s[0]); m = int.Parse(s[1]);
            int[,,] cube = new int[n + 1, n + 1, n + 1];
            
                var reader = new StringReader(actions);
                string line;
                while (null != (line = reader.ReadLine()))
                {
                    //Console.WriteLine(line);

                    string[] x = line.Split(' ');
                    if (x[0] == "UPDATE")
                    {
                        cube[int.Parse(x[1]), int.Parse(x[2]), int.Parse(x[3])] = int.Parse(x[4]);
                    }
                    else
                    {
                        int x1 = int.Parse(x[1]);
                        int y1 = int.Parse(x[2]);
                        int z1 = int.Parse(x[3]);
                        int x2 = int.Parse(x[4]);
                        int y2 = int.Parse(x[5]);
                        int z2 = int.Parse(x[6]);
                        double sum = 0;
                        for (int i = x1; i <= x2; i++)
                        {
                            for (int j = y1; j <= y2; j++)
                            {
                                for (int k = z1; k <= z2; k++)
                                {
                                    sum += cube[i, j, k];
                                }
                            }
                        }
                        retValue.Add(sum.ToString());
                     
                    }
                }
         
            return retValue;
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}
