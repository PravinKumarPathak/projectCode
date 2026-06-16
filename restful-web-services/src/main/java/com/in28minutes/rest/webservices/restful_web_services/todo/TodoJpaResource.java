package com.in28minutes.rest.webservices.restful_web_services.todo;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class TodoJpaResource {


	@Autowired
	private TodoJpaRepository todoJpaRepository;
	
	
	@GetMapping("/jpa/users/{username}/todos")
	public List<Todo> getAllTodo(@PathVariable String username) {
		return todoJpaRepository.findByUsername(username);
	}

	
	@GetMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Todo> getTodo(@PathVariable String username, @PathVariable long id) {
		
		Optional<Todo> foundTodo = todoJpaRepository.findById(id);
		
		if(!foundTodo.isEmpty()) {
			return new ResponseEntity<Todo>(foundTodo.get(), HttpStatus.OK);
		}

		return ResponseEntity.notFound().build();
	}

	
	@DeleteMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id) {
		
		if(todoJpaRepository.existsById(id)) {
			todoJpaRepository.deleteById(id);
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.notFound().build();
	}

	
	@PutMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable long id,
			@RequestBody Todo todo) {

		todo.setId(id);
		todo.setUsername(username);
		
		if(todoJpaRepository.existsById(id)) {
			Todo todoUpdated = todoJpaRepository.save(todo);
			return new ResponseEntity<Todo>(todoUpdated, HttpStatus.OK);
		}

		return ResponseEntity.notFound().build();
	}

	
	@PostMapping("/jpa/users/{username}/todos")
	public ResponseEntity<Void> createTodo(@PathVariable String username, @RequestBody Todo todo) {
		
		todo.setUsername(username);
		
		Todo createdTodo = todoJpaRepository.save(todo);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTodo.getId())
				.toUri();

		return ResponseEntity.created(uri).build();
	}
}
