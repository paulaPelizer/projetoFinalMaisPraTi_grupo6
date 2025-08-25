package com.adi.docflow.service.processor;

import com.adi.docflow.job.JobType;
import com.adi.docflow.model.AutomationJob;
import org.springframework.stereotype.Component;

@Component
public class EmailJobProcessor implements JobProcessor {

    @Override
    public JobType getType() {
        return JobType.EMAIL_NOTIFY;
    }

    @Override
    public void process(AutomationJob job) throws Exception {
        // TODO: implementar envio real (SMTP/serviço), ler job.getPayload() como JSON
        // Por ora, apenas simula.
        Thread.sleep(200);
    }
}
