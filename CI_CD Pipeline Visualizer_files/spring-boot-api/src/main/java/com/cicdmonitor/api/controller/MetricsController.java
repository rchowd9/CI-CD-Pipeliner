package  com.cicdmonitor.api.controller;

import com.cicdmonitor.api.service.MetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/metrics")
@CrossOrigin(origins = "*")
public class MetricsController {
    
    @Autowired
    private MetricsService metricsService;
    
    @GetMapping("/dora")
    public ResponseEntity<Map<String, Object>> getDoraMetrics() {
        Map<String, Object> metrics = metricsService.calculateDoraMetrics();
        return ResponseEntity.ok(metrics);
    }
}
 