using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public MatchController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"Select Id, Team1Id, Team2Id, TeamWinId, Team1Score, Team2Score, TeamHomeId from dbo.Match";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TrenerAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(Match obj)
        {
            string query = @"Insert into dbo.Match values
                ('" + obj.Team1Id + "','" + obj.Team2Id + "', '"+ obj.TeamWinId + "', '"+obj.Team1Score + "', '"+ obj.Team2Score + "', '"+ obj.TeamHomeId + "')";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TrenerAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Match obj)
        {
            string query = @"Update dbo.Match set
                Team1Id = '" + obj.Team1Id + @"',
                Team2Id='" + obj.Team2Id + @"', TeamWinId='" + obj.TeamWinId + @"', Team1Score='" + obj.Team1Score + @"', Team2Score='" + obj.Team2Score + @"', TeamHomeId='" + obj.TeamHomeId + "' where Id = " + obj.Id;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TrenerAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"Delete from dbo.Match where Id = " + id;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TrenerAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

    }
}
