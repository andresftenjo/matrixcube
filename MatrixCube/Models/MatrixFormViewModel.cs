using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MatrixCube.Models
{
    // Models returned by AccountController actions.
    public class MatrixFormViewModel
    {
        [Required]
        [Display(Name = "Input")]
        public string InputMatrix { get; set; }
    }
}
