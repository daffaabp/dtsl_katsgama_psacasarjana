// "use strict";var KTAppContactEdit={init:function(){var t;(()=>{const t=document.getElementById("kt_ecommerce_settings_general_form");if(!t)return;const e=t.querySelectorAll(".required");var n,o={fields:{},plugins:{trigger:new FormValidation.plugins.Trigger,bootstrap:new FormValidation.plugins.Bootstrap5({rowSelector:".fv-row",eleInvalidClass:"",eleValidClass:""})}};e.forEach((t=>{const e=t.closest(".fv-row").querySelector("input");e&&(n=e);const r=t.closest(".fv-row").querySelector("select");r&&(n=r);const i=n.getAttribute("name");o.fields[i]={validators:{notEmpty:{message:t.innerText+" is required"}}}}));var r=FormValidation.formValidation(t,o);const i=t.querySelector('[data-kt-contacts-type="submit"]');i.addEventListener("click",(function(t){t.preventDefault(),r&&r.validate().then((function(t){console.log("validated!"),"Valid"==t?(i.setAttribute("data-kt-indicator","on"),i.disabled=!0,setTimeout((function(){i.removeAttribute("data-kt-indicator"),i.disabled=!1,Swal.fire({text:"Form has been successfully submitted!",icon:"success",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}})}),2e3)):Swal.fire({text:"Oops! There are some error(s) detected.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}})}))}))})(),t=function(t){if(!t.id)return t.text;var e=document.createElement("span"),n="";return n+='<img src="'+t.element.getAttribute("data-kt-select2-country")+'" class="rounded-circle me-2" style="height:19px;" alt="image"/>',n+=t.text,e.innerHTML=n,$(e)},$('[data-kt-ecommerce-settings-type="select2_flags"]').select2({placeholder:"Select a country",minimumResultsForSearch:1/0,templateSelection:t,templateResult:t})}};KTUtil.onDOMContentLoaded((function(){KTAppContactEdit.init()}));
"use strict";

const KTAppContactEdit = {
  init: function () {
    const form = document.getElementById("kt_ecommerce_settings_general_form");
    if (!form) return;

    const requiredFields = form.querySelectorAll(".required");

    const validationOptions = {
      fields: {},
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap: new FormValidation.plugins.Bootstrap5({
          rowSelector: ".fv-row",
          eleInvalidClass: "",
          eleValidClass: ""
        })
      }
    };

    requiredFields.forEach((field) => {
      const row = field.closest(".fv-row");
      const input = row.querySelector("input") || row.querySelector("select");
      if (!input) return;

      const fieldName = input.getAttribute("name");
      validationOptions.fields[fieldName] = {
        validators: {
          notEmpty: {
            message: `${field.innerText} is required`
          }
        }
      };
    });

    const validator = FormValidation.formValidation(form, validationOptions);
    const submitButton = form.querySelector('[data-kt-contacts-type="submit"]');

    submitButton.addEventListener("click", function (e) {
      e.preventDefault();

      if (!validator) return;

      validator.validate().then(function (status) {
        console.log("validated!");
        if (status === "Valid") {
          submitButton.setAttribute("data-kt-indicator", "on");
          submitButton.disabled = true;

          setTimeout(function () {
            submitButton.removeAttribute("data-kt-indicator");
            submitButton.disabled = false;

            Swal.fire({
              text: "Form has been successfully submitted!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn btn-primary"
              }
            });
          }, 2000);
        } else {
          Swal.fire({
            text: "Oops! There are some error(s) detected.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary"
            }
          });
        }
      });
    });

    // Sanitize and safely generate HTML element without using innerHTML
    const countryTemplate = function (data) {
      if (!data.id) return data.text;

      const span = document.createElement("span");

      const img = document.createElement("img");
      img.src = data.element.getAttribute("data-kt-select2-country");
      img.className = "rounded-circle me-2";
      img.style.height = "19px";
      img.alt = "image";

      const text = document.createTextNode(data.text);

      span.appendChild(img);
      span.appendChild(text);

      return $(span);
    };

    $('[data-kt-ecommerce-settings-type="select2_flags"]').select2({
      placeholder: "Select a country",
      minimumResultsForSearch: Infinity,
      templateSelection: countryTemplate,
      templateResult: countryTemplate
    });
  }
};

KTUtil.onDOMContentLoaded(function () {
  KTAppContactEdit.init();
});
