/** @odoo-module **/

    // require('web.dom_ready');
    import publicWidget from "@web/legacy/js/public/public_widget";

    publicWidget.registry.authsignup = publicWidget.Widget.extend({
        selector: ".field-user-type,.field-country_id",
        events: {
            'click .user_btn': 'usersignup',
            'click .company_btn': 'companysignup',
            'change #country_id': '_onChangeCountry',
        },
        start: function () {
            var defult_selected = this.$el.find('.person').is(":checked")
            if (defult_selected == true) {
                this.usersignup()
                this._onChangeCountry()
            }
        },

        usersignup: function () {
            $("div[class^='company_vat_group'] > label").remove()
            $("div[class^='company_vat_group'] > input").remove()
        },

        companysignup: function (){
            if ($('.label_vat').hasClass('label_vat') && $('.input_vat').hasClass('input_vat')) {
            }else{
                var label = '<label class="label_vat" for="vat">VAT</label>'
                var input = '<input type="text" name="vat" t-att-value="vat" id="vat" class="form-control form-control-sm input_vat" required="required"/>'
                $('div .company_vat_group').append(label)
                $('div .company_vat_group').append(input)
            }
        },

        _onChangeCountry: function(){
            var country_id = $("#country_id :selected").val();
            var temp = 0
            var country_list = []
            $("#state_id > option").each(function() {
                if ($(this).attr('country_id') == country_id){
                    $(this).removeClass('d-none')
                    country_list.push(this.value)
                    temp = temp + 1
                } else {
                    $(this).addClass('d-none')
                }
            });
            if (temp==0){
                $('#state_id').val("0")
                $(".field-state_id").addClass('d-none')
            }
            else{
                $(".field-state_id").removeClass('d-none')
                $("#state_id").val(country_list[0])
            }
        },
    });

    $(document).ready(function() {
        $('#fetch_companies').on('click', function() {
            var national_id = $('#national_id').val();
            if (national_id) {
                $.ajax({
                    url: 'https://api.wathq.sa/v5/commercialregistration/related/' + national_id + '/nid/sa',
                    headers: {
                        'accept': 'application/json',
                        'apiKey': 'g36VC0YZOQR7kS4HgaH9X1WAX4rDgJlW'
                    },
                    method: 'GET',
                    success: function(data) {
                        var companiesList = $('#companies_list');
                        companiesList.empty();
                        if (data.length > 0) {
                            data.forEach(function(company) {
                                companiesList.append(
                                    '<div class="form-check">' +
                                    '<input class="form-check-input" type="radio" name="company" id="company_' + company.crNumber + '" value="' + company.crNumber + '" data-name="' + company.crName + '"/>' +
                                    '<label class="form-check-label" for="company_' + company.crNumber + '">' + company.crName + ' (' + company.crNumber + ')</label>' +
                                    '</div>'
                                );
                            });
                            
                            // Event listener for company radio buttons
                            $('input[name="company"]').on('change', function() {
                                var selectedCRName = $(this).data('name');
                                var selectedCRNumber = $(this).val();
                                
                                // Set the values of crName and crNumber in the hidden input fields
                                $('#crName').val(selectedCRName);
                                $('#crNumber').val(selectedCRNumber);
                            });
                        } else {
                            companiesList.append('<p>No companies found.</p>');
                        }
                    },
                    error: function() {
                        alert('Failed to fetch companies. Please check the national ID and try again.');
                    }
                });
            } else {
                alert('Please enter a national ID.');
            }
        });
    });
    
    function generateOTP() {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp.toString();
    }

    $(document).ready(function() {
        $('#sendOtp').on('click', function() {
            var phoneNumber = $('#phone').val();
            
            if (phoneNumber) {
                otp = generateOTP()
                console.log(otp)

                // $.ajax({
                //     url: 'https://api.wathq.sa/v5/commercialregistration/related/' + national_id + '/nid/sa',
                //     headers: {
                //         'accept': 'application/json',
                //         'apiKey': 'g36VC0YZOQR7kS4HgaH9X1WAX4rDgJlW'
                //     },
                //     method: 'GET',
                //     success: function(data) {
                //         var companiesList = $('#companies_list');
                //         companiesList.empty();
                //         if (data.length > 0) {
                //             data.forEach(function(company) {
                //                 companiesList.append(
                //                     '<div class="form-check">' +
                //                     '<input class="form-check-input" type="radio" name="company" id="company_' + company.crNumber + '" value="' + company.crNumber + '" data-name="' + company.crName + '"/>' +
                //                     '<label class="form-check-label" for="company_' + company.crNumber + '">' + company.crName + ' (' + company.crNumber + ')</label>' +
                //                     '</div>'
                //                 );
                //             });
                            
                //             // Event listener for company radio buttons
                //             $('input[name="company"]').on('change', function() {
                //                 var selectedCRName = $(this).data('name');
                //                 var selectedCRNumber = $(this).val();
                                
                //                 // Set the values of crName and crNumber in the hidden input fields
                //                 $('#crName').val(selectedCRName);
                //                 $('#crNumber').val(selectedCRNumber);
                //             });
                //         } else {
                //             companiesList.append('<p>No companies found.</p>');
                //         }
                //     },
                //     error: function() {
                //         alert('Failed to fetch companies. Please check the national ID and try again.');
                //     }
                // });
            } else {
                alert('Please enter a national ID.');
            }
        });
    });
    

    
    
    
    