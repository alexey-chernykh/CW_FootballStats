using System.Collections.Generic;

namespace WebApplication1
{

    public class Team
    {
        public int Id { get; set; }
        public string TeamName { get; set; }
        public string Herb { get; set; }
        public string City { get; set; }
        public string HomeStadion { get; set; }
        public int TrenerId { get; set; }
        public List<string> Roster { get; set; }
        public List<string> PlayerPhotos { get; set; }

    }
}