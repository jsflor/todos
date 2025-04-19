using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TodoApi.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [JsonIgnore] // Never return the password in responses
        public string Password { get; set; } = string.Empty;
    }
}