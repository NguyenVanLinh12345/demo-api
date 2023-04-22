package student.web.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;
import java.util.Collections;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;

import student.data.StudentRepository;
import student.Student;

@RestController
@RequestMapping(path = "/danhsach", produces = "application/json")
@CrossOrigin(origins = "*")
public class StudentControl {
	private StudentRepository myStudentRepo;

	public StudentControl(StudentRepository myStudentRepo) {
		this.myStudentRepo = myStudentRepo;
	}

	@GetMapping
	public Iterable<Student> getAllStudent() {
		return myStudentRepo.findAll();
	}

	@PostMapping(consumes = "application/json")
	@ResponseStatus(HttpStatus.CREATED)
	public Student postStudent(@RequestBody Student mystudent) {
		return myStudentRepo.save(mystudent);
	}
	
	@PutMapping("/{id}") 
	public Map<String, String> putStudent(@PathVariable long id, @RequestBody Student myStudent) { 
//		Student myStudent = myStudentRepo.findById(id).get();
		myStudentRepo.save(myStudent); 
		return Collections.singletonMap("message", "Edit " + id + " succsess");
	} 
	@DeleteMapping("/{id}")
	public Map<String, String> deleteStudent(@PathVariable long id) {
		Student myStudent = myStudentRepo.findById(id).get();
		myStudentRepo.delete(myStudent); 
		return Collections.singletonMap("message", "Delete " + id + " succsess");
	}

}