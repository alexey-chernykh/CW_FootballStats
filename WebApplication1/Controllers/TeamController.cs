using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public TeamController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"Select dbo.Team.Id, dbo.Team.TeamName, dbo.Team.Herb, dbo.Team.City, dbo.Team.HomeStadion, dbo.Team.TrenerId from dbo.Team";
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
        public JsonResult Post(Team obj)
        {
            string query = @"Insert into dbo.Team values
                ('" + obj.TeamName + "','" + obj.Herb + "','"+obj.City+ "','"+obj.HomeStadion+"','"+obj.TrenerId+"')";
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
        public JsonResult Put(Team obj)
        {
            string query = @"Update dbo.Team set
                TeamName = '" + obj.TeamName + @"',
                Herb='" + obj.Herb + @"', City='"+ obj.City + @"', HomeStadion='"+obj.HomeStadion+@"', TrenerId='"+obj.TrenerId+"' where Id = " + obj.Id;
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
            string query = @"Delete from dbo.Team where Id = " + id;
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
