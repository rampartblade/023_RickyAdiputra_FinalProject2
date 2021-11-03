using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PaymentAPI.Data;
using PaymentAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PaymentAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class PaymentDetailController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public PaymentDetailController(ApiDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetItems()
        {
            var items = await _context.CreditCardDetails.ToListAsync();
            return Ok(items);
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem(ItemData data)
        {
            if (ModelState.IsValid)
            {
                await _context.CreditCardDetails.AddAsync(data);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetItem", new { data.PaymentDetailId }, data);
            }
            return new JsonResult("Something Went Wrong!") { StatusCode = 500 };
        }

        [HttpGet("{PaymentDetailId}")]
        public async Task<IActionResult> GetItem(int PaymentDetailId)
        {
            var item = await _context.CreditCardDetails.FirstOrDefaultAsync(x => x.PaymentDetailId == PaymentDetailId);

            if(item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, ItemData item)
        {
            if(id != item.PaymentDetailId)
            {
                return BadRequest();
            }

            var existItem = await _context.CreditCardDetails.FirstOrDefaultAsync(x => x.PaymentDetailId == id);

            if(existItem == null)
            {
                return NotFound();
            }
            existItem.CardOwnerName = item.CardOwnerName;
            existItem.CardNumber = item.CardNumber;
            existItem.ExpirationDate = item.ExpirationDate;
            existItem.SecurityCode = item.SecurityCode;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var existItem = await _context.CreditCardDetails.FirstOrDefaultAsync(x => x.PaymentDetailId == id);

            if(existItem == null)
            {
                return NotFound();
            }

            _context.CreditCardDetails.Remove(existItem);
            await _context.SaveChangesAsync();

            return Ok(existItem);
        }
    }
}
