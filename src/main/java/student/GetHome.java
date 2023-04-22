package student;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GetHome {
	@GetMapping("/")
	public String getHome() {
		return "Home";
	}
}
