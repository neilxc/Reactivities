using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Application.Interfaces;
using Domain;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Security
{
    public class JwtGenerator : IJwtGenerator
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        public JwtGenerator(IConfiguration config)
        {
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
        }
        public string CreateToken(AppUser user)
        {
            // generate list of claims to include in the token
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };

            // generate signing credentials. The server needs to encrypt a key we provide
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            // generate a token descriptor, this will include a subject, expiry date and the creds
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            // generate a token handler
            var tokenHandler = new JwtSecurityTokenHandler();

            // create the token
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // return the token
            return tokenHandler.WriteToken(token);
        }
    }
}
