using System.Collections.Generic;

namespace PaymentAPI.Configuration
{
    public class AuthResult
    {
        public string Token {get; set;}
        public string RefreshToken { get; set; }
        public bool Success {get; set;}
        public List <string> Status {get; set;}
    }
}