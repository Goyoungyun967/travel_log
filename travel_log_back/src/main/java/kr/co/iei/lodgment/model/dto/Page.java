package kr.co.iei.lodgment.model.dto;

import kr.co.iei.util.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Page {
	private int start;
	private int end;
	private int loginNo;
	private int lodgmentNo;
}
