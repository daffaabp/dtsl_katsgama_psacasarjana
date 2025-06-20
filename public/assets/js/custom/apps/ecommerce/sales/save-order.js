// "use strict";var KTAppEcommerceSalesSaveOrder=function(){var e,t;return{init:function(){(()=>{$("#kt_ecommerce_edit_order_date").flatpickr({altInput:!0,altFormat:"d F, Y",dateFormat:"Y-m-d"});const r=e=>{if(!e.id)return e.text;var t=document.createElement("span"),r="";return r+='<img src="'+e.element.getAttribute("data-kt-select2-country")+'" class="rounded-circle h-20px me-2" alt="image"/>',r+=e.text,t.innerHTML=r,$(t)};$("#kt_ecommerce_edit_order_billing_country").select2({placeholder:"Select a country",minimumResultsForSearch:1/0,templateSelection:r,templateResult:r}),$("#kt_ecommerce_edit_order_shipping_country").select2({placeholder:"Select a country",minimumResultsForSearch:1/0,templateSelection:r,templateResult:r}),e=document.querySelector("#kt_ecommerce_edit_order_product_table"),t=$(e).DataTable({order:[],scrollY:"400px",scrollCollapse:!0,paging:!1,info:!1,columnDefs:[{orderable:!1,targets:0}]})})(),document.querySelector('[data-kt-ecommerce-edit-order-filter="search"]').addEventListener("keyup",(function(e){t.search(e.target.value).draw()})),(()=>{const e=document.getElementById("kt_ecommerce_edit_order_shipping_form");document.getElementById("same_as_billing").addEventListener("change",(t=>{t.target.checked?e.classList.add("d-none"):e.classList.remove("d-none")}))})(),(()=>{const t=e.querySelectorAll('[type="checkbox"]'),r=document.getElementById("kt_ecommerce_edit_order_selected_products"),o=document.getElementById("kt_ecommerce_edit_order_total_price");t.forEach((e=>{e.addEventListener("change",(t=>{const o=e.closest("tr").querySelector('[data-kt-ecommerce-edit-order-filter="product"]').cloneNode(!0),i=document.createElement("div"),n=o.innerHTML,a=["d-flex","align-items-center"];o.classList.remove(...a),o.classList.add("col","my-2"),o.innerHTML="",i.classList.add(...a),i.classList.add("border","border-dashed","rounded","p-3","bg-body"),i.innerHTML=n,o.appendChild(i);const c=o.getAttribute("data-kt-ecommerce-edit-order-id");if(t.target.checked)r.appendChild(o);else{const e=r.querySelector('[data-kt-ecommerce-edit-order-id="'+c+'"]');e&&r.removeChild(e)}d()}))}));const d=()=>{const e=r.querySelector("span"),t=r.querySelectorAll('[data-kt-ecommerce-edit-order-filter="product"]');t.length<1?(e.classList.remove("d-none"),o.innerText="0.00"):(e.classList.add("d-none"),i(t))},i=e=>{let t=0;e.forEach((e=>{const r=parseFloat(e.querySelector('[data-kt-ecommerce-edit-order-filter="price"]').innerText);t=parseFloat(t+r)})),o.innerText=t.toFixed(2)}})(),(()=>{let e;const t=document.getElementById("kt_ecommerce_edit_order_form"),r=document.getElementById("kt_ecommerce_edit_order_submit");e=FormValidation.formValidation(t,{fields:{payment_method:{validators:{notEmpty:{message:"Payment method is required"}}},shipping_method:{validators:{notEmpty:{message:"Shipping method is required"}}},order_date:{validators:{notEmpty:{message:"Order date is required"}}},billing_order_address_1:{validators:{notEmpty:{message:"Address line 1 is required"}}},billing_order_postcode:{validators:{notEmpty:{message:"Postcode is required"}}},billing_order_state:{validators:{notEmpty:{message:"State is required"}}},billing_order_country:{validators:{notEmpty:{message:"Country is required"}}}},plugins:{trigger:new FormValidation.plugins.Trigger,bootstrap:new FormValidation.plugins.Bootstrap5({rowSelector:".fv-row",eleInvalidClass:"",eleValidClass:""})}}),r.addEventListener("click",(o=>{o.preventDefault(),e&&e.validate().then((function(e){console.log("validated!"),"Valid"==e?(r.setAttribute("data-kt-indicator","on"),r.disabled=!0,setTimeout((function(){r.removeAttribute("data-kt-indicator"),Swal.fire({text:"Form has been successfully submitted!",icon:"success",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}}).then((function(e){e.isConfirmed&&(r.disabled=!1,window.location=t.getAttribute("data-kt-redirect"))}))}),2e3)):Swal.fire({html:"Sorry, looks like there are some errors detected, please try again.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn btn-primary"}})}))}))})()}}}();KTUtil.onDOMContentLoaded((function(){KTAppEcommerceSalesSaveOrder.init()}));

"use strict";

var KTAppEcommerceSalesSaveOrder = (function () {
  var tableElement, dataTable;

  return {
    init: function () {
      // Initialize date picker
      $("#kt_ecommerce_edit_order_date").flatpickr({
        altInput: true,
        altFormat: "d F, Y",
        dateFormat: "Y-m-d"
      });

      // Safe country template
      const countryTemplate = function (data) {
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

      // Select2 for billing/shipping country
      $("#kt_ecommerce_edit_order_billing_country").select2({
        placeholder: "Select a country",
        minimumResultsForSearch: Infinity,
        templateSelection: countryTemplate,
        templateResult: countryTemplate
      });

      $("#kt_ecommerce_edit_order_shipping_country").select2({
        placeholder: "Select a country",
        minimumResultsForSearch: Infinity,
        templateSelection: countryTemplate,
        templateResult: countryTemplate
      });

      // DataTable
      tableElement = document.querySelector("#kt_ecommerce_edit_order_product_table");
      dataTable = $(tableElement).DataTable({
        order: [],
        scrollY: "400px",
        scrollCollapse: true,
        paging: false,
        info: false,
        columnDefs: [{ orderable: false, targets: 0 }]
      });

      // Search
      document
        .querySelector('[data-kt-ecommerce-edit-order-filter="search"]')
        .addEventListener("keyup", function (e) {
          dataTable.search(e.target.value).draw();
        });

      // Toggle shipping address
      const shippingForm = document.getElementById("kt_ecommerce_edit_order_shipping_form");
      document.getElementById("same_as_billing").addEventListener("change", function (e) {
        shippingForm.classList.toggle("d-none", e.target.checked);
      });

      // Product selection
      const checkboxes = tableElement.querySelectorAll('[type="checkbox"]');
      const selectedProductsContainer = document.getElementById("kt_ecommerce_edit_order_selected_products");
      const totalPriceDisplay = document.getElementById("kt_ecommerce_edit_order_total_price");

      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", (e) => {
          const row = checkbox.closest("tr");
          const productOriginal = row.querySelector('[data-kt-ecommerce-edit-order-filter="product"]');
          const productClone = productOriginal.cloneNode(true);
          const productId = productClone.getAttribute("data-kt-ecommerce-edit-order-id");

          // Layout fixes
          productClone.classList.remove("d-flex", "align-items-center");
          productClone.classList.add("col", "my-2");

          // Create wrapper
          const wrapper = document.createElement("div");
          wrapper.classList.add(
            "d-flex",
            "align-items-center",
            "border",
            "border-dashed",
            "rounded",
            "p-3",
            "bg-body"
          );

          // Move children to wrapper safely
          while (productClone.firstChild) {
            wrapper.appendChild(productClone.firstChild);
          }

          productClone.appendChild(wrapper);

          if (e.target.checked) {
            selectedProductsContainer.appendChild(productClone);
          } else {
            const existing = selectedProductsContainer.querySelector(`[data-kt-ecommerce-edit-order-id="${productId}"]`);
            if (existing) selectedProductsContainer.removeChild(existing);
          }

          updateTotal();
        });
      });

      function updateTotal() {
        const emptyState = selectedProductsContainer.querySelector("span");
        const selected = selectedProductsContainer.querySelectorAll(
          '[data-kt-ecommerce-edit-order-filter="product"]'
        );

        if (selected.length < 1) {
          emptyState.classList.remove("d-none");
          totalPriceDisplay.innerText = "0.00";
        } else {
          emptyState.classList.add("d-none");
          calculateTotal(selected);
        }
      }

      function calculateTotal(products) {
        let total = 0;
        products.forEach((el) => {
          const price = parseFloat(
            el.querySelector('[data-kt-ecommerce-edit-order-filter="price"]').innerText
          );
          total += price;
        });
        totalPriceDisplay.innerText = total.toFixed(2);
      }

      // Form Validation
      let validator;
      const form = document.getElementById("kt_ecommerce_edit_order_form");
      const submitBtn = document.getElementById("kt_ecommerce_edit_order_submit");

      validator = FormValidation.formValidation(form, {
        fields: {
          payment_method: {
            validators: {
              notEmpty: { message: "Payment method is required" }
            }
          },
          shipping_method: {
            validators: {
              notEmpty: { message: "Shipping method is required" }
            }
          },
          order_date: {
            validators: {
              notEmpty: { message: "Order date is required" }
            }
          },
          billing_order_address_1: {
            validators: {
              notEmpty: { message: "Address line 1 is required" }
            }
          },
          billing_order_postcode: {
            validators: {
              notEmpty: { message: "Postcode is required" }
            }
          },
          billing_order_state: {
            validators: {
              notEmpty: { message: "State is required" }
            }
          },
          billing_order_country: {
            validators: {
              notEmpty: { message: "Country is required" }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: ".fv-row",
            eleInvalidClass: "",
            eleValidClass: ""
          })
        }
      });

      submitBtn.addEventListener("click", function (e) {
        e.preventDefault();

        if (!validator) return;

        validator.validate().then(function (status) {
          console.log("validated!");
          if (status === "Valid") {
            submitBtn.setAttribute("data-kt-indicator", "on");
            submitBtn.disabled = true;

            setTimeout(function () {
              submitBtn.removeAttribute("data-kt-indicator");

              Swal.fire({
                text: "Form has been successfully submitted!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary"
                }
              }).then(function (result) {
                if (result.isConfirmed) {
                  submitBtn.disabled = false;
                  window.location = form.getAttribute("data-kt-redirect");
                }
              });
            }, 2000);
          } else {
            Swal.fire({
              html: "Sorry, looks like there are some errors detected, please try again.",
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
    }
  };
})();

// Init on DOM ready
KTUtil.onDOMContentLoaded(function () {
  KTAppEcommerceSalesSaveOrder.init();
});
