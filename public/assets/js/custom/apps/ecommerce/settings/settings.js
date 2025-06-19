// "use strict";var KTAppEcommerceSettings={init:function(){["kt_ecommerce_settings_general_form","kt_ecommerce_settings_general_store","kt_ecommerce_settings_general_localization","kt_ecommerce_settings_general_products","kt_ecommerce_settings_general_customers"].forEach((e=>{const t=document.getElementById(e);if(!t)return;const r=t.querySelectorAll(".required");var o,n={fields:{},plugins:{trigger:new FormValidation.plugins.Trigger,bootstrap:new FormValidation.plugins.Bootstrap5({rowSelector:".fv-row",eleInvalidClass:"",eleValidClass:""})}};r.forEach((e=>{const t=e.closest(".row").querySelector("input");t&&(o=t);const r=e.closest(".row").querySelector("textarea");r&&(o=r);const s=e.closest(".row").querySelector("select");s&&(o=s);const i=o.getAttribute("name");n.fields[i]={validators:{notEmpty:{message:e.innerText+" is required"}}}}));var s=FormValidation.formValidation(t,n);const i=t.querySelector('[data-kt-ecommerce-settings-type="submit"]');i.addEventListener("click",(function(e){e.preventDefault(),s&&s.validate().then((function(e){console.log("validated!"),"Valid"==e?(i.setAttribute("data-kt-indicator","on"),i.disabled=!0,setTimeout((function(){i.removeAttribute("data-kt-indicator"),i.disabled=!1,Swal.fire({text:"Form has been successfully submitted!",icon:"success",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}})}),2e3)):Swal.fire({text:"Oops! There are some error(s) detected.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}})}))}))})),document.querySelectorAll('[data-kt-ecommerce-settings-type="tagify"]').forEach((e=>{new Tagify(e)})),(()=>{const e=e=>{if(!e.id)return e.text;var t=document.createElement("span"),r="";return r+='<img src="'+e.element.getAttribute("data-kt-select2-country")+'" class="rounded-circle h-20px me-2" alt="image"/>',r+=e.text,t.innerHTML=r,$(t)};$('[data-kt-ecommerce-settings-type="select2_flags"]').select2({placeholder:"Select a country",minimumResultsForSearch:1/0,templateSelection:e,templateResult:e})})()}};KTUtil.onDOMContentLoaded((function(){KTAppEcommerceSettings.init()}));
"use strict";

var KTAppEcommerceSettings = {
  init: function () {
    const formIds = [
      "kt_ecommerce_settings_general_form",
      "kt_ecommerce_settings_general_store",
      "kt_ecommerce_settings_general_localization",
      "kt_ecommerce_settings_general_products",
      "kt_ecommerce_settings_general_customers"
    ];

    formIds.forEach((formId) => {
      const form = document.getElementById(formId);
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

      requiredFields.forEach((label) => {
        const row = label.closest(".row");
        const input = row.querySelector("input") || row.querySelector("textarea") || row.querySelector("select");
        if (!input) return;

        const fieldName = input.getAttribute("name");
        validationOptions.fields[fieldName] = {
          validators: {
            notEmpty: {
              message: `${label.innerText} is required`
            }
          }
        };
      });

      const validator = FormValidation.formValidation(form, validationOptions);
      const submitButton = form.querySelector('[data-kt-ecommerce-settings-type="submit"]');

      submitButton.addEventListener("click", function (e) {
        e.preventDefault();
        validator && validator.validate().then((status) => {
          console.log("validated!");
          if (status === "Valid") {
            submitButton.setAttribute("data-kt-indicator", "on");
            submitButton.disabled = true;

            setTimeout(() => {
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
    });

    // Initialize Tagify
    document.querySelectorAll('[data-kt-ecommerce-settings-type="tagify"]').forEach((el) => {
      new Tagify(el);
    });

    // Safe country select2 template
    const countryTemplate = (data) => {
      if (!data.id) return data.text;

      const span = document.createElement("span");

      const img = document.createElement("img");
      img.src = data.element.getAttribute("data-kt-select2-country");
      img.className = "rounded-circle h-20px me-2";
      img.alt = "image";

      const text = document.createTextNode(data.text);

      span.appendChild(img);
      span.appendChild(text);

      return $(span);
    };

    // Initialize select2
    $('[data-kt-ecommerce-settings-type="select2_flags"]').select2({
      placeholder: "Select a country",
      minimumResultsForSearch: Infinity,
      templateSelection: countryTemplate,
      templateResult: countryTemplate
    });
  }
};

KTUtil.onDOMContentLoaded(function () {
  KTAppEcommerceSettings.init();
});
