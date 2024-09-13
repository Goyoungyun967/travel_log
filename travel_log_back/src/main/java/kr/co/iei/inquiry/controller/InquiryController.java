package kr.co.iei.inquiry.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin("*")
@RequestMapping(value="/inquiry")
@Tag(name = "INQUIRY", description = "INQUIRY API")
public class InquiryController {

}
